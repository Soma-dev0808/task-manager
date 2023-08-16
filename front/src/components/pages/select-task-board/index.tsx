import { IconButton, Button } from '@/components/ui/Button'
import { Header } from '@/components/ui/Header'
import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { LogoutButton } from '@/components/ui/LogoutButton'
import { routePath } from '@/routes'
import { useSelectTaskBoard } from './hooks/useSelectTaskBoard'
import {
  AddTaskBoardWrapper,
  BoardName,
  BoardNameList,
  BoardNameWrapper,
  SelectTaskBoardWrapper,
  StyledLink,
  Title,
} from './Styles'

const SelectTaskBoard = () => {
  const { taskBoardList, handleCreateTaskBoard, setAddTaskInput, addTaskInput } =
    useSelectTaskBoard()

  return (
    <>
      <Header>
        <Title>Select Task Board</Title>
        <LogoutButton />
      </Header>
      <SelectTaskBoardWrapper>
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
    </>
  )
}

export default SelectTaskBoard
