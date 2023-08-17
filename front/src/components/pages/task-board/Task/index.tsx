import { Draggable } from 'react-beautiful-dnd'

import { nonNullable } from '@/libs/typeGuards'
import { TaskType } from '@/redux/feature/taskBoardSlice'
import { Container, Estimate, TaskBriefDetail, TaskId, TaskTitle, TitleContainer } from './Styles'

const getId = (taskId: string): string =>
  nonNullable(taskId.split('-').at(1)) ? taskId.split('-')[1] : taskId

const Task = ({
  task,
  index,
  onClick,
}: {
  task: TaskType
  index: number
  onClick: (taskId: string) => void
}) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        onClick={() => onClick(task.id)}
      >
        <TitleContainer>
          <TaskId>
            <span>#{getId(task.id)}</span>
          </TaskId>
          <TaskTitle>{task.title}</TaskTitle>
        </TitleContainer>

        {nonNullable(task.estimate) && (
          <TaskBriefDetail>
            <Estimate>{task.estimate}</Estimate>
          </TaskBriefDetail>
        )}
      </Container>
    )}
  </Draggable>
)

export default Task
