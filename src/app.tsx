import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'

import { Link, Outlet } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'

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
    <VStack align="stretch">
      <Box sx={{ p: 4 }}>
        <ButtonGroup isAttached size="sm" variant="action" width="100%">
          <Button as={Link} to="/">
            Home
          </Button>
          <Button as={Link} to="actions">
            Actions
          </Button>
        </ButtonGroup>
        <VStack sx={{ pb: 4 }} align="stretch">
          <VStack align="stretch">
            <Box sx={{ fontWeight: 'bold' }}>js&rarr;rs (every 5s)</Box>
            <Box>
              <SkeletonText noOfLines={2} isLoaded={msg}>
                {msg}
              </SkeletonText>
            </Box>
          </VStack>
          <VStack align="stretch">
            <Box sx={{ fontWeight: 'bold' }}>rs&rarr;js (every 5s)</Box>
            <Box>
              <SkeletonText noOfLines={2} isLoaded={rsEvent}>
                {rsEvent && JSON.stringify(rsEvent as any, null, 2)}
              </SkeletonText>
            </Box>
          </VStack>
        </VStack>
        <Outlet />
      </Box>
    </VStack>
  )
}

export default App
