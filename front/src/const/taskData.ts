import { TaskDataType } from '@/redux/feature/taskBoardSlice'

const dummyData: TaskDataType = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Take out the garbage',
      content: 'Take out the garbage. !!!',
      estimate: 1,
    },
    'task-2': {
      id: 'task-2',
      title: 'Watch my favorite show',
      content: 'Watch my favorite show !!!',
      estimate: 2,
    },
    'task-3': {
      id: 'task-3',
      title: 'Charge my phone',
      content: 'Charge my phone!!!',
      estimate: undefined,
    },
    'task-4': {
      id: 'task-4',
      title: 'Cook dinner',
      content: 'Cook dinner !!!',
      estimate: undefined,
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Freezed',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
}

export { dummyData }
