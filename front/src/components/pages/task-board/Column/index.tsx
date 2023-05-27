import { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { useDispatch } from 'react-redux'
import { taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'
import { Container, TaskList } from './Styles'
import type { ColumnProps } from './type'
import { ColumnHeader } from '../ColumnHeader'
import { ColumnInput } from '../ColumnInput'
import Task from '../Task'

const Column = ({ column: { title, id }, tasks, index }: ColumnProps) => {
  const dispatch = useDispatch()

  const [showInput, setShowInput] = useState<boolean>(false)
  const handlePlusClick = () => setShowInput((prev) => !prev)
  const handleCancelClick = () => setShowInput(false)

  const handleTaskClicked = (taskId: string) => {
    dispatch(
      taskBoardReducerActions.toggleSidebar({
        isOpen: true,
        columnId: id,
        taskId,
      })
    )
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <ColumnHeader
            id={id}
            dragHandleProps={provided.dragHandleProps}
            title={title}
            handlePlusClick={handlePlusClick}
          />
          {showInput && <ColumnInput id={id} handleClose={handleCancelClick} />}
          {/* TODO: switch done and active */}
          <Droppable droppableId={id} type={id === 'column-3' ? 'active' : 'active'}>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, idx) => (
                  <Task key={task.id} task={task} index={idx} onClick={handleTaskClicked} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column
