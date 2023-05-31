import { authImpl } from './authService'
import { selectBoardImpl } from './selectBoardService'

export const backend = {
  auth: authImpl,
  selectBoard: selectBoardImpl,
}
