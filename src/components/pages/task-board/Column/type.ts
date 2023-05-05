import { ComponentPropsWithRef } from 'react'

import type { ColumnType, TaskType } from '@/redux/feature/taskBoardSlice'

type ColumnProps = {
  column: ColumnType
  tasks: TaskType[]
  index: number
}

type TaskListProps = ComponentPropsWithRef<'div'> & {
  isDraggingOver: boolean
}

export type { ColumnProps, TaskListProps }
