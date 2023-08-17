import { authImpl } from './authService'
import { selectBoardImpl } from './selectBoardService'
import { taskBoardImpl } from './taskBoardService'
import { usersImpl } from './userService'

export const backend = {
  auth: authImpl,
  selectBoard: selectBoardImpl,
  board: taskBoardImpl,
  users: usersImpl,
}
