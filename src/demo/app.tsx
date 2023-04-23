import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'

import { Link, Outlet } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { SkeletonText } from '../components/ui/skeleton'
import { Toaster } from '../components/ui/toast/toaster'

function App() {
  const [msg, setMsg] = useState()
  const [rsEvent, setRsEvent] = useState()

  // Note: setInterval is firing off a promise and does not wait for it to resolve.
  // depending on what you want to get done, it may be smarter to use a different
  // scheduling technique for an async call that may take longer than the interval
  // from time to time.
  useEffect(() => {
    const interval = setInterval(() => {
      invoke('interval_action', { msg: `interval msg` }).then((s: any) => {
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
        <Button as={Link} to="/">
          Home
        </Button>
        <Button as={Link} to="actions">
          Actions
        </Button>
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
