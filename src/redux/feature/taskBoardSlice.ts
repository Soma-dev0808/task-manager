import { DraggableLocation } from 'react-beautiful-dnd'
import { dummyData } from '@/const/taskData'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/configureStore'

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
  taskBoardData: TaskDataType
  isLoading: boolean
  error?: string | null
  sideBar: {
    isOpen: boolean
    task: TaskType | undefined
    columnId: string | undefined
  }
}

const initialTaskBoardData: TaskBoardDataType = {
  taskBoardData: {
    tasks: {},
    columns: {},
    columnOrder: [],
  },
  isLoading: false,
  error: null,
  sideBar: {
    isOpen: false,
    task: undefined,
    columnId: undefined,
  },
}

const dummyFetchTaskData = () => new Promise<TaskDataType>((res) => res(dummyData))

const fetchTaskData = createAsyncThunk<{ taskBoardData: TaskDataType }>(
  'taskBoard/fetchTaskData',
  async () => {
    const response = await dummyFetchTaskData()
    return { taskBoardData: response }
  }
)

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
    handleAddTask: (state, action: PayloadAction<{ columnId: string; title: string }>) => {
      const { columnId, title } = action.payload
      const newTaskId = `task-${Object.keys(state.taskBoardData.tasks).length + 1}`
      const newTask = {
        id: newTaskId,
        title,
        content: '',
        estimate: undefined,
      }

      state.taskBoardData.tasks[newTask.id] = newTask
      state.taskBoardData.columns[columnId].taskIds = [
        newTask.id,
        ...state.taskBoardData.columns[columnId].taskIds,
      ]
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
    updateTask: (state, action: PayloadAction<TaskType>) => {
      const { id, title, content, estimate } = action.payload
      if (typeof id === 'undefined') return
      state.taskBoardData.tasks[id] = {
        ...state.taskBoardData.tasks[id],
        title,
        content,
        estimate,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTaskData.fulfilled, (state, action) => {
        state.isLoading = false
        state.taskBoardData = action.payload.taskBoardData
      })
      .addCase(fetchTaskData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
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

const taskBoardReducerActions = { fetchTaskData, ...taskBoardSlice.actions }

export {
  selectTaskBoardSlice,
  selectTaskBoard,
  selectTasks,
  selectColumns,
  selectColumnOrder,
  selectColumn,
  selectTask,
  selectSideBar,
  taskBoardReducerActions,
}

export type { TaskDataType, TaskType, ColumnType }
export default taskBoardSlice.reducer
