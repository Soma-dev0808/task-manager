import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

type ColumnHeaderProps = {
  id: string
  title: string
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  handlePlusClick: () => void
}

export type { ColumnHeaderProps }
