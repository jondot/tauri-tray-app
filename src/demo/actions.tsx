/* eslint-disable no-console */
import { invoke } from '@tauri-apps/api'
import { useToast } from '../components/ui/toast/use-toast'
import { Button } from '../components/ui/button'
import { useBearStore, useFishStore } from '../zstore'
const Actions = () => {
  const { toast } = useToast()

  // zustand
  const bears = useBearStore((state) => state.bears)
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  const fish = useFishStore((state) => state.fishes)
  const addAFish = useFishStore((state) => state.addAFish)

  const setMenuItem = () => {
    invoke('set_menu_item', { title: `JS count: ${bears}` })
  }

  const addMenuItem = () => {
    invoke('add_menu_item', {
      id: `custom-${bears}`,
      title: `New JS count ${bears}`,
    })
  }

  const setIcon = (label: string) => () => {
    invoke('set_icon', { name: label })
  }

  return (
    <div>
      <div>
        <div className="bg-background">hello</div>
        <Button
          onClick={() => {
            console.log('making a request')
            invoke('api_request', { msg: 'api msg' }).then((res) => {
              console.log('showing toast')
              toast({
                title: 'Request done',
                description: JSON.stringify(res, null, 2),
                duration: 2000,
              })
            })
          }}
        >
          make request
        </Button>
        <Button onClick={increasePopulation}>bears: {bears}</Button>
        <Button onClick={addAFish}>fish: {fish}</Button>
        <Button onClick={setMenuItem}>Set menu item</Button>
        <Button onClick={addMenuItem}>Add menu item</Button>
        <Button onClick={setIcon('notification')}>
          Set tray icon notifications
        </Button>
        <Button onClick={setIcon('')}>Clear tray icon notifications</Button>
        <Button variant="filled">twnd button (nothing)</Button>
      </div>
    </div>
  )
}

export default Actions
