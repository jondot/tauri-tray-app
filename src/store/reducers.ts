import { combineReducers } from '@reduxjs/toolkit'
import counter from './counter'

export const rootReducer = combineReducers({
  counter,
})

export const persist = ['counter']
