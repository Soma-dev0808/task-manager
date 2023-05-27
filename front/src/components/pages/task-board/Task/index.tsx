import { Draggable } from 'react-beautiful-dnd'

import { TaskType } from '@/redux/feature/taskBoardSlice'
import { Container } from './Styles'

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
        {task.title}
      </Container>
    )}
  </Draggable>
)

export default Task
