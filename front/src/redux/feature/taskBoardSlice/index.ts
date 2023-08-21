import { backend } from '@/repository'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type {
  HandleMoveBaseType,
  HandleMoveBetweenColumnType,
  TaskType,
  ColumnType,
  TaskDataType,
  TaskBoardDataType,
  APITaskDataType,
  APITaskBoardDataType,
  UserInTaskBoardObjectType,
} from './type'
import { RootState } from '../../app/configureStore'

const initialTaskBoardData: TaskBoardDataType = {
  taskBoardName: undefined,
  usersInTaskBoard: [],
  taskBoardData: {
    tasks: {},
    columns: {},
    columnOrder: [],
  },
  isLoading: false,
  error: undefined,
  sideBar: {
    isOpen: false,
    task: undefined,
    columnId: undefined,
  },
  modal: {
    isOpen: false,
    columnId: undefined,
  },
}

const sortOrder = <T extends { order: number | null }, U extends { order: number | null }>(
  a: T,
  b: U
) => {
  if (a.order === null) return 1
  if (b.order === null) return -1
  return a.order - b.order
}

// TODO: Move it somewhere
const modifyFetchedData = (data: APITaskDataType[]): TaskDataType => {
  const taskBoardData = { tasks: {}, columns: {}, columnOrder: [] } as TaskDataType
  try {
    data.sort(sortOrder).forEach((column) => {
      column.tasks.forEach((task) => {
        taskBoardData.tasks[`task-${task.task_id}`] = {
          id: `task-${task.task_id}`,
          title: task.title,
          content: task.content ?? '',
          estimate: task.estimate ? Number(task.estimate) : undefined,
        }
      })
      taskBoardData.columns[`column-${column.column_id}`] = {
        id: `column-${column.column_id}`,
        title: column.title,
        taskIds: column.tasks.sort(sortOrder).map((task) => `task-${task.task_id}`),
      }
      taskBoardData.columnOrder.push(`column-${column.column_id}`)
    })
  } catch (error) {
    console.log(error)
  }

  return taskBoardData
}

const ModifyUserBoardData = (data: UserInTaskBoardObjectType[]) =>
  data.map((data) => data.user.user_id)

const fetchTaskData = createAsyncThunk<
  {
    taskBoardData: TaskDataType
    taskBoardName: string | undefined
    usersInTaskBoard: number[]
  },
  {
    boardId: string
    token: string
  }
>('taskBoard/fetchTaskData', async ({ boardId, token }) => {
  const res = await backend.board.fetchTaskBoardData(token, boardId)

  // TODO: Add error handling
  if (res.status !== 200) {
    throw new Error('Failed to fetch task data')
    // For now just return dummy data
    // const response = await dummyFetchTaskData()
    // return { taskBoardData: response, taskBoardName: undefined }
  }

  const taskColumns = res.data.taskColumns as APITaskDataType[]
  const taskBoardName = res.data.taskBoard as APITaskBoardDataType
  return {
    taskBoardData: modifyFetchedData(taskColumns),
    taskBoardName: taskBoardName.board_name,
    usersInTaskBoard: ModifyUserBoardData(taskBoardName.user_boards),
  }
})

const createTask = createAsyncThunk<
  { task: TaskType; columnId: string },
  {
    columnId: string
    title: string
    token: string
  }
>('taskBoard/createTask', async ({ columnId, title, token }) => {
  const ci = columnId.split('-')[1]
  const res = await backend.board.postTask(ci, title, token)

  if (res.status !== 200) {
    throw new Error('Failed to create task')
  }

  const task = {
    id: `task-${res.data.task.task_id}`,
    title: res.data.task.title,
    content: res.data.task.content ?? '',
    estimate: res.data.task.estimate ? Number(res.data.task.estimate) : undefined,
  }
  return { task, columnId }
})

const updateTask = createAsyncThunk<
  { task: TaskType },
  { taskId: string; title: string; content: string; estimate: number | undefined; token: string }
>('taskBoard/updateTask', async ({ taskId, title, content, estimate, token }) => {
  const ti = taskId.split('-')[1]
  const res = await backend.board.updateTask(ti, title, content, estimate ?? 0, token)

  if (res.status !== 200) {
    throw new Error('Failed to update task')
  }

  const task = {
    id: `task-${res.data.task.task_id}`,
    title: res.data.task.title,
    content: res.data.task.content ?? '',
    estimate: res.data.task.estimate ? Number(res.data.task.estimate) : undefined,
  }
  return { task }
})

const updateTaskOrder = createAsyncThunk<
  { tasks: TaskType[] },
  { columnId: string; taskId: string; newOrderIdx: number; token: string }
>('taskBoard/updateTaskOrder', async ({ columnId, taskId, newOrderIdx, token }) => {
  const ti = taskId.split('-')[1]
  const ci = columnId.split('-')[1]
  const res = await backend.board.updateTaskOrder(ti, ci, newOrderIdx + 1, token)

  if (res.status !== 200) {
    throw new Error('Failed to update task order')
  }

  return { tasks: res.data as TaskType[] }
})

const updateColumnOrder = createAsyncThunk<
  { tasks: TaskType[] },
  { columnId: string; columnOrderIdx: number; token: string }
>('taskBoard/updateColumnOrder', async ({ columnId, columnOrderIdx, token }) => {
  const ci = columnId.split('-')[1]
  const res = await backend.board.updateColumnOrder(ci, columnOrderIdx + 1, token)

  if (res.status !== 200) {
    throw new Error('Failed to update column order')
  }

  return { tasks: res.data as TaskType[] }
})

const updateTaskOrderOverColumn = createAsyncThunk<
  { tasks: TaskType[] },
  { taskId: string; newColumnId: string; newOrderIdx: number; token: string }
>('taskBoard/updateTaskOrderOverColumn', async ({ taskId, newColumnId, newOrderIdx, token }) => {
  const ti = taskId.split('-')[1]
  const newCi = newColumnId.split('-')[1]
  const res = await backend.board.updateTaskOrderOverColumn(ti, newCi, newOrderIdx + 1, token)

  if (res.status !== 200) {
    throw new Error('Failed to update column order')
  }

  return { tasks: res.data as TaskType[] }
})

const deleteTask = createAsyncThunk<
  { taskId: string; columnId: string },
  { taskId: string; columnId: string; token: string }
>('taskBoard/deleteTask', async ({ taskId, columnId, token }) => {
  const ti = taskId.split('-')[1]
  const res = await backend.board.deleteTask(ti, token)

  if (res.status !== 200) {
    throw new Error('Failed to delete task')
  }

  return { taskId, columnId }
})

const deleteColumn = createAsyncThunk<{ columnId: string }, { columnId: string; token: string }>(
  'taskBoard/deleteColumn',
  async ({ columnId, token }) => {
    const ci = columnId.split('-')[1]

    const res = await backend.board.deleteColumn(ci, token)

    if (res.status !== 200) {
      throw new Error('Failed to delete column')
    }

    return { columnId }
  }
)

const createColumn = createAsyncThunk<
  { column: ColumnType },
  { title: string; token: string; boardId: string }
>('taskBoard/createColumn', async ({ title, token, boardId }) => {
  const res = await backend.board.postColumn(boardId, title, token)

  if (res.status !== 200) {
    throw new Error('Failed to create column')
  }

  const column = {
    id: `column-${res.data.column.column_id}`,
    title: res.data.column.title,
    taskIds: [],
  }
  return { column }
})

export const taskBoardSlice = createSlice({
  name: 'taskBoard',
  initialState: initialTaskBoardData,
  reducers: {
    handleMoveColumn: (state, action: PayloadAction<HandleMoveBaseType>) => {
      const { source, destination, draggableId } = action.payload

      const newColumnOrder = [...state.taskBoardData.columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      state.taskBoardData.columnOrder = newColumnOrder
    },
    handleMoveTaskWithinColumn: (state, action: PayloadAction<HandleMoveBaseType>) => {
      const { source, destination, draggableId } = action.payload
      const column = state.taskBoardData.columns[source.droppableId]
      const newTaskIds = [...column.taskIds]

      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      }

      state.taskBoardData.columns[newColumn.id] = newColumn
    },
    handleMoveTaskOverColumn: (state, action: PayloadAction<HandleMoveBetweenColumnType>) => {
      const { start, end, source, destination, draggableId } = action.payload
      const startTaskIds = [...start.taskIds]
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const endTaskIds = [...end.taskIds]
      endTaskIds.splice(destination.index, 0, draggableId)
      const newEnd = {
        ...end,
        taskIds: endTaskIds,
      }

      state.taskBoardData.columns[newStart.id] = newStart
      state.taskBoardData.columns[newEnd.id] = newEnd
    },
    toggleSidebar: (
      state,
      action: PayloadAction<
        | {
            isOpen: true
            columnId: string
            taskId: string
          }
        | {
            isOpen: false
            columnId?: undefined
            taskId?: undefined
          }
      >
    ) => {
      const { isOpen, columnId, taskId } = action.payload
      if (!isOpen) {
        state.sideBar.isOpen = isOpen
        state.sideBar.task = undefined
        return
      }
      const task = state.taskBoardData?.columns[columnId].taskIds.find((id) => id === taskId)
      if (typeof task === 'undefined') return

      state.sideBar.isOpen = isOpen
      state.sideBar.task = state.taskBoardData.tasks[task]
      state.sideBar.columnId = columnId
    },
    toggleModal: (
      state,
      action: PayloadAction<
        | {
            isOpen: true
            columnId: string
          }
        | {
            isOpen: false
            columnId?: undefined
          }
      >
    ) => {
      const { isOpen, columnId } = action.payload
      state.modal.isOpen = isOpen
      state.modal.columnId = columnId
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskData.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchTaskData.fulfilled, (state, action) => {
        state.isLoading = false
        state.taskBoardData = action.payload.taskBoardData
        state.taskBoardName = action.payload.taskBoardName
        state.usersInTaskBoard = action.payload.usersInTaskBoard
      })
      .addCase(fetchTaskData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        const { task, columnId } = action.payload
        const newTaskId = task.id
        state.taskBoardData.tasks[newTaskId] = task
        state.taskBoardData.columns[columnId].taskIds = [
          newTaskId,
          ...state.taskBoardData.columns[columnId].taskIds,
        ]
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, title, content, estimate } = action.payload.task
        state.taskBoardData.tasks[id] = {
          ...state.taskBoardData.tasks[id],
          id,
          title,
          content,
          estimate,
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { taskId, columnId } = action.payload
        const newTaskIds = state.taskBoardData.columns[columnId].taskIds.filter(
          (id) => id !== taskId
        )
        state.taskBoardData.columns[columnId].taskIds = newTaskIds
        delete state.taskBoardData.tasks[taskId]
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isLoading = false
        const { column } = action.payload
        const newColumnId = column.id
        state.taskBoardData.columns[newColumnId] = column
        state.taskBoardData.columnOrder = [...state.taskBoardData.columnOrder, newColumnId]
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(updateTaskOrder.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(updateTaskOrder.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateTaskOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(updateColumnOrder.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(updateColumnOrder.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateColumnOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(updateTaskOrderOverColumn.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(updateTaskOrderOverColumn.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateTaskOrderOverColumn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false
        const { columnId } = action.payload
        const newColumnOrder = state.taskBoardData.columnOrder.filter((id) => id !== columnId)
        state.taskBoardData.columnOrder = newColumnOrder
        delete state.taskBoardData.columns[columnId]
      })
      .addCase(deleteColumn.rejected, (state) => {
        state.isLoading = false
        state.error = 'Make sure to delete all tasks in the column first.'
      })
  },
})

const selectTaskBoardSlice = (state: RootState) => state.taskBoard
const selectTaskBoard = (state: RootState) => state.taskBoard.taskBoardData
const selectTasks = (state: RootState) => state.taskBoard.taskBoardData?.tasks
const selectColumns = (state: RootState) => state.taskBoard.taskBoardData?.columns
const selectColumnOrder = (state: RootState) => state.taskBoard.taskBoardData?.columnOrder

const selectColumn = (columnId: string) => (state: RootState) =>
  state.taskBoard.taskBoardData?.columns[columnId]
const selectTask = (columnId: string, taskId: string) => (state: RootState) => {
  const task = state.taskBoard.taskBoardData?.columns[columnId].taskIds.find((id) => id === taskId)
  if (typeof task === 'undefined') undefined
  return task
}
const selectSideBar = (state: RootState) => state.taskBoard.sideBar
const selectModal = (state: RootState) => state.taskBoard.modal

const taskBoardReducerActions = {
  fetchTaskData,
  createTask,
  updateTask,
  deleteTask,
  createColumn,
  deleteColumn,
  updateTaskOrder,
  updateColumnOrder,
  updateTaskOrderOverColumn,
  ...taskBoardSlice.actions,
}

export {
  selectTaskBoardSlice,
  selectTaskBoard,
  selectTasks,
  selectColumns,
  selectColumnOrder,
  selectColumn,
  selectTask,
  selectSideBar,
  selectModal,
  taskBoardReducerActions,
}

export type { TaskDataType, TaskType, ColumnType }
export default taskBoardSlice.reducer
