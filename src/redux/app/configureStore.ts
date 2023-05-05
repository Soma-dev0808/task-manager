import { configureStore } from '@reduxjs/toolkit'

import taskBoardReducer from '../feature/taskBoardSlice'

const store = configureStore({
  reducer: {
    taskBoard: taskBoardReducer,
  },
})

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppGetState = typeof store.getState
export type AppDispatch = typeof store.dispatch
export type GenericCommonActionType = (
  ...args: Array<any>
) => (dispatch: AppDispatch, getState: AppGetState) => void
export type CommonActionType = () => (dispatch: AppDispatch, getState: AppGetState) => void
