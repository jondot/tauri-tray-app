import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'

import { Link, Outlet } from 'react-router-dom'
import { MoonIcon, SunIcon } from 'lucide-react'
import { SkeletonText } from '../components/xui/skeleton'
import { Toaster } from '@/components/ui/toaster'
import { Button, buttonVariants } from '@/components/ui/button'
import { useDark } from '@/components/xui/use-dark'

function App() {
  const [msg, setMsg] = useState()
  const [rsEvent, setRsEvent] = useState()

  const { toggleDark, isDark } = useDark()

  // Note: setInterval is firing off a promise and does not wait for it to resolve.
  // depending on what you want to get done, it may be smarter to use a different
  // scheduling technique for an async call that may take longer than the interval
  // from time to time.
  useEffect(() => {
    const interval = setInterval(() => {
      invoke('interval_action', { msg: 'interval msg' }).then((s: any) => {
        setMsg(s)
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect((): any => {
    listen('rs_js_emit', (event: any) => setRsEvent(event))
  }, [])

  return (
    <div>
      <div className="p-4">
        <div className="flex space-x-1">
          <Link className={buttonVariants({ variant: 'outline' })} to="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: 'outline' })} to="actions">
            Actions
          </Link>
          <Button variant="ghost" onClick={toggleDark}>{isDark ? <SunIcon className="h-5 w-5 text-foreground"/> : <MoonIcon className="h-5 w-5 text-foreground"/>}</Button>
        </div>

        <div>
          <div>
            <div>js&rarr;rs (every 5s)</div>
            <div>
              <SkeletonText numLines={2} isLoaded={msg}>
                {msg}
              </SkeletonText>
            </div>
          </div>
          <div>
            <div>rs&rarr;js (every 5s)</div>
            <div>
              <SkeletonText numLines={2} isLoaded={rsEvent}>
                {rsEvent && JSON.stringify(rsEvent as any, null, 2)}
              </SkeletonText>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      <Toaster />
    </div>
  )
}

export default App
