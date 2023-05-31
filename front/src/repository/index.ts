import { authImpl } from './authService'
import { selectBoardImpl } from './selectBoardService'
import { taskBoardImpl } from './taskBoardService'

export const backend = {
  auth: authImpl,
  selectBoard: selectBoardImpl,
  board: taskBoardImpl,
}
