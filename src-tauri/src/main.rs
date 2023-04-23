#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use chrono::Duration;
use serde::Serialize;
use tauri::Manager;
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};

use std::sync::Arc;
use std::sync::Mutex;
use std::thread;

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
fn greet(
    _window: tauri::Window,
    app_handle: tauri::AppHandle,
    name: &str,
    password: &str,
    email: &str,
) -> String {
    let item_handle = app_handle.tray_handle().get_item("user");
    item_handle.set_title(format!("User: {}", name)).unwrap();
    format!("hello {}, {}, password: {}", name, email, password)
}

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
fn set_menu_item(app_handle: tauri::AppHandle, title: &str) {
    let item_handle = app_handle.tray_handle().get_item("dynamic-item");
    item_handle.set_title(title).unwrap();
}

// there's no way to grab the current menu, and add to it, creating
// an evergrowing menu. so, we rebuild the initial menu and add an item.
// this means we'll only add one item, but to add an arbitrary number,
// make this command accept an array of items.
// also, you probably would want to inject the new items in a specific place,
// so you'd have to split the initial menu to [start] [your content] [end],
// where 'end' contains things like "show" and "quit".
#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
fn add_menu_item(app_handle: tauri::AppHandle, id: &str, title: &str) {
    let mut menu = build_menu();
    let item = CustomMenuItem::new(id.to_string(), title);
    menu = menu.add_item(item);
    app_handle.tray_handle().set_menu(menu).unwrap();
}

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
fn set_icon(app_handle: tauri::AppHandle, name: &str) {
    match name {
        "notification" => app_handle
            .tray_handle()
            .set_icon(tauri::Icon::Raw(
                include_bytes!("../icons/32x32-notification.png").to_vec(),
            ))
            .unwrap(),
        _ => app_handle
            .tray_handle()
            .set_icon(tauri::Icon::Raw(
                include_bytes!("../icons/32x32.png").to_vec(),
            ))
            .unwrap(),
    };
}

#[tauri::command]
fn interval_action(msg: &str) -> String {
    let out = format!("interval_action: {}", chrono::Local::now().to_rfc3339());
    println!("js -> rs {} - {}", out, msg);
    out
}

#[derive(Serialize)]
struct Content {
    body: String,
}

#[tauri::command]
async fn api_request(msg: &str) -> Result<Vec<Content>, String> {
    println!("js -> rs api_request - {}", msg);
    let res = reqwest::get("https://example.com")
        .await
        .map_err(|e| e.to_string())?;
    let out = res.text().await.map_err(|e| e.to_string())?;
    Ok(vec![Content { body: out }])
}

#[allow(dead_code)]
#[tauri::command]
fn init_process(window: tauri::Window) {
    std::thread::spawn(move || loop {
        window
            .emit(
                "beep",
                format!("beep: {}", chrono::Local::now().to_rfc3339()),
            )
            .unwrap();

        thread::sleep(Duration::seconds(5).to_std().unwrap());
    });
}
fn build_menu() -> SystemTrayMenu {
    let menuitem_quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let menuitem_show = CustomMenuItem::new("show".to_string(), "Show");
    SystemTrayMenu::new()
        .add_item(menuitem_show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("user".to_string(), "User"))
        .add_item(CustomMenuItem::new("rs-count".to_string(), "RS count"))
        .add_item(CustomMenuItem::new("dynamic-item".to_string(), "Change me"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(menuitem_quit)
}

fn main() {
    #[allow(clippy::mutex_integer)]
    let count = Arc::new(Mutex::new(0));

    let tray_menu = build_menu();

    tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(move |app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                // this demos how to mutate and set some local state that is
                // bound to `main`, with mutex and arc.
                println!("system tray received a left click");
                let item_handle = app.tray_handle().get_item("rs-count");
                let mut c = count.lock().unwrap();
                *c += 1;

                item_handle.set_title(format!("RS count: {}", c)).unwrap();
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "show" => {
                    let w = app.get_window("main").unwrap();
                    w.show().unwrap();

                    // because the window shows in a specific workspace and the user
                    // can hide it and move to another, it will next show in the original
                    // workspace it was opened in.
                    // this is important for the window to always show in whatever workspace
                    // the user moved to and is active in.
                    w.set_focus().unwrap();
                }

                _ => {}
            },
            _ => {}
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                // don't kill the app when the user clicks close. this is important
                event.window().hide().unwrap();
                api.prevent_close();
            }
            tauri::WindowEvent::Focused(false) => {
                // hide the window automaticall when the user
                // clicks out. this is for a matter of taste.
                event.window().hide().unwrap();
            }
            _ => {}
        })
        .setup(|app| {
            // don't show on the taskbar/springboard
            // this is purely a personal taste thing
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            let window = app.get_window("main").unwrap();

            // this is a workaround for the window to always show in current workspace.
            // see https://github.com/tauri-apps/tauri/issues/2801
            window.set_always_on_top(true).unwrap();

            // watch out! forever loop, every 5s emit an event
            // to the JS side, which has to subscribe on the event ID.
            std::thread::spawn(move || loop {
                window
                    .emit(
                        "rs_js_emit",
                        format!("beep: {}", chrono::Local::now().to_rfc3339()),
                    )
                    .unwrap();
                println!("rs -> js emit");

                thread::sleep(Duration::seconds(5).to_std().unwrap());
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            set_menu_item,
            add_menu_item,
            interval_action,
            api_request,
            set_icon
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
