import { Login, Register, TaskBoard } from '@/components/pages'

export const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/task-board',
    component: TaskBoard,
  },
]
