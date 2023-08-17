import { DraggableLocation } from 'react-beautiful-dnd'

type HandleMoveBaseType = {
  source: DraggableLocation
  destination: DraggableLocation
  draggableId: string
}

type HandleMoveBetweenColumnType = HandleMoveBaseType & {
  start: ColumnType
  end: ColumnType
}

type TaskType = {
  id: string
  title: string
  content: string
  estimate: number | undefined
}

type ColumnType = {
  id: string
  title: string
  taskIds: string[]
}

type TaskDataType = {
  tasks: {
    [key: string]: TaskType
  }
  columns: {
    [key: string]: ColumnType
  }
  columnOrder: string[]
}

type TaskBoardDataType = {
  taskBoardName: string | undefined
  usersInTaskBoard: number[]
  taskBoardData: TaskDataType
  isLoading: boolean
  error?: string
  sideBar: {
    isOpen: boolean
    task: TaskType | undefined
    columnId: string | undefined
  }
  modal: {
    isOpen: boolean
    columnId: string | undefined
  }
}

// TODO: Add type file for backend response
type APITaskDataType = {
  column_id: number
  order: number | null
  title: string
  tasks: {
    order: number
    task_id: number
    title: string
    content: string | null
    estimate: string | null
  }[]
}

type UserInTaskBoardType = {
  email_addres: string
  user_id: number
  user_name: string
}
type UserInTaskBoardObjectType = {
  user: UserInTaskBoardType
  user_board_id: number
}

// TODO: Add type file for backend response
type APITaskBoardDataType = {
  board_id: number
  board_name: string
  user_boards: UserInTaskBoardObjectType[]
}

export type {
  HandleMoveBaseType,
  HandleMoveBetweenColumnType,
  TaskType,
  ColumnType,
  TaskDataType,
  TaskBoardDataType,
  APITaskDataType,
  APITaskBoardDataType,
  UserInTaskBoardObjectType,
  UserInTaskBoardType,
}
