import { IconButton, Button } from '@/components/ui/Button'
import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { routePath } from '@/routes'
import { useSelectTaskBoard } from './hooks/useSelectTaskBoard'
import {
  AddTaskBoardWrapper,
  BoardName,
  BoardNameList,
  BoardNameWrapper,
  SelectTaskBoardWrapper,
  StyledLink,
} from './Styles'

const SelectTaskBoard = () => {
  const { taskBoardList, handleCreateTaskBoard, setAddTaskInput, addTaskInput } =
    useSelectTaskBoard()

  return (
    <SelectTaskBoardWrapper>
      <h1>Select Task Board</h1>
      <AddTaskBoardWrapper>
        <input value={addTaskInput} onChange={(e) => setAddTaskInput(e.target.value)} />
        <IconButton onClick={() => handleCreateTaskBoard(addTaskInput)}>
          <PlusIcon />
        </IconButton>
      </AddTaskBoardWrapper>
      <BoardNameList>
        {taskBoardList.map((taskBoard) => (
          <BoardNameWrapper key={taskBoard.board_id}>
            <BoardName>
              <span>{taskBoard.board_name}</span>
            </BoardName>
            <Button>
              <StyledLink to={`${routePath.taskBoard}/${taskBoard.board_id}`}>Select</StyledLink>
            </Button>
          </BoardNameWrapper>
        ))}
      </BoardNameList>
    </SelectTaskBoardWrapper>
  )
}

export default SelectTaskBoard
