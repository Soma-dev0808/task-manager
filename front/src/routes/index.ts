import { Login, Register, TaskBoard, SelectTaskBoard } from '@/components/pages'

export const routePath = {
  root: '/',
  login: '/login',
  registration: '/registration',
  taskBoard: '/task-board',
  selectTaskBoard: '/select-task-board',
}

export const routes = [
  {
    path: routePath.root,
    component: () => Login,
  },
  {
    path: routePath.login,
    component: () => Login,
  },
  {
    path: routePath.registration,
    component: () => Register,
  },
  {
    path: routePath.taskBoard + '/:boardId',
    component: () => TaskBoard,
  },
  {
    path: routePath.selectTaskBoard,
    component: () => SelectTaskBoard,
  },
]
