import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { BoardHeader } from './BoardHeader'
import Column from './Column'
import { useTaskBoard } from './hooks/useTaskBoard'
import { MenuBar } from './MenuBar'
import { Sidebar } from './SideBar'
import { Container } from './Styles'

const TaskBoard = () => {
  const { taskBoardData, taskBoardName, onDragEnd } = useTaskBoard()
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
    </>
  )
}

export default TaskBoard
