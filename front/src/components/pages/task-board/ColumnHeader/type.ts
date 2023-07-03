import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

type ColumnHeaderProps = {
  id: string
  title: string
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  handlePlusClick: () => void
  handleToggleDeleteColumnModal: (columnId: string) => void
}

export type { ColumnHeaderProps }
