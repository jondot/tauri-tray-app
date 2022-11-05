/* eslint-disable no-console */
import { invoke } from '@tauri-apps/api'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup, VStack, useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import type { RootState } from './store'
import { useBearStore, useFishStore } from './zstore'
import { increment } from './store/counter'
const Actions = () => {
  const toast = useToast()

  // redux
  const count = useSelector<RootState>((state) => state.counter.value)
  const dispatch = useDispatch()
  const incrementAction = useCallback(() => dispatch(increment()), [dispatch])

  // zustand
  const bears = useBearStore((state) => state.bears)
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  const fish = useFishStore((state) => state.fishes)
  const addAFish = useFishStore((state) => state.addAFish)

  const setMenuItem = () => {
    invoke('set_menu_item', { title: `JS count: ${count}` })
  }

  const addMenuItem = () => {
    invoke('add_menu_item', {
      id: `custom-${count}`,
      title: `New JS count ${count}`,
    })
  }

  const setIcon = (label: string) => () => {
    invoke('set_icon', { name: label })
  }

  return (
    <ButtonGroup colorScheme="blue" variant="action" width="100%">
      <VStack width="100%">
        <Button
          onClick={() => {
            console.log('making a request')
            invoke('api_request', { msg: 'api msg' }).then((res) =>
              toast({
                title: 'Request done',
                description: JSON.stringify(res, null, 2),
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
            )
          }}
        >
          make request
        </Button>
        <Button onClick={incrementAction}>{`count: ${count}`}</Button>
        <Button onClick={increasePopulation}>bears: {bears}</Button>
        <Button onClick={addAFish}>fish: {fish}</Button>
        <Button onClick={setMenuItem}>Set menu item</Button>
        <Button onClick={addMenuItem}>Add menu item</Button>
        <Button onClick={setIcon('notification')}>
          Set tray icon notifications
        </Button>
        <Button onClick={setIcon('')}>Clear tray icon notifications</Button>
      </VStack>
    </ButtonGroup>
  )
}

export default Actions
