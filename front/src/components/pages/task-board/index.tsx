import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { Button } from '@/components/ui/Button'
import { Modal, ModalButtonContainer, ModalDescription, ModalTitle } from '@/components/ui/Modal'
import BoardFooter from './BoardFooter'
import { BoardHeader } from './BoardHeader'
import Column from './Column'
import { useTaskBoard } from './hooks/useTaskBoard'
import { MenuBar } from './MenuBar'
import { Sidebar } from './SideBar'
import { Container } from './Styles'

const TaskBoard = () => {
  const {
    taskBoardData,
    taskBoardName,
    onDragEnd,

    // modal
    isOpen,
    handleModalClose,
    handleColumnDelete,
  } = useTaskBoard()
  return (
    <>
      <BoardHeader taskBoardName={taskBoardName} />
      <MenuBar />

      <div
        style={{
          width: '100vw',
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {taskBoardData.columnOrder.map((columnId, idx) => {
                  const column = taskBoardData.columns[columnId]
                  const tasks = column.taskIds.map((taskId) => taskBoardData.tasks[taskId])

                  return <Column key={column.id} column={column} tasks={tasks} index={idx} />
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Sidebar />
      <Modal isOpen={isOpen} onOutSideClicked={handleModalClose}>
        <ModalTitle>Modal</ModalTitle>
        <ModalDescription>Are you sure you want to delete this task column?</ModalDescription>
        <ModalButtonContainer>
          <Button buttonColor="default" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button buttonColor="danger" onClick={handleColumnDelete}>
            Delete
          </Button>
        </ModalButtonContainer>
      </Modal>
      <BoardFooter />
    </>
  )
}

export default TaskBoard
