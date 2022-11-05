import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearsState {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
}

export const useBearStore = create<BearsState>()(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () =>
        set((state) => ({ bears: state.bears + 1 }), false, 'addBear'), // use a name that appears on devtool
      removeAllBears: () => set({ bears: 0 }),
    }),

    { name: 'bears' }
  )
)

interface FishState {
  fishes: number
  addAFish: () => void
}

export const useFishStore = create<FishState>()(
  devtools(
    persist(
      (set, get) => ({
        fishes: 0,
        addAFish: () => set({ fishes: get().fishes + 1 }),
      }),
      {
        name: 'food-storage', // name of item in the storage (must be unique)
        getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
      }
    ),
    { name: 'fish' }
  )
)
