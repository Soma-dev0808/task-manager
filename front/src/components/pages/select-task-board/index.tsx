import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/ui/Header'
import { LogoutButton } from '@/components/ui/LogoutButton'
import { PlusButton } from '@/components/ui/PlusButton'
import { routePath } from '@/routes'
import { useSelectTaskBoard } from './hooks/useSelectTaskBoard'
import {
  AddTaskBoardWrapper,
  BoardName,
  BoardNameList,
  BoardNameWrapper,
  SelectTaskBoardWrapper,
  Title,
} from './Styles'

const SelectTaskBoard = () => {
  const { taskBoardList, handleCreateTaskBoard, setAddTaskInput, addTaskInput } =
    useSelectTaskBoard()
  const navigate = useNavigate()

  return (
    <>
      <Header>
        <Title>Select Task Board</Title>
        <LogoutButton />
      </Header>
      <SelectTaskBoardWrapper>
        <AddTaskBoardWrapper>
          <input value={addTaskInput} onChange={(e) => setAddTaskInput(e.target.value)} />
          <PlusButton onClick={() => handleCreateTaskBoard(addTaskInput)} />
        </AddTaskBoardWrapper>
        <BoardNameList>
          {taskBoardList.map((taskBoard) => (
            <BoardNameWrapper key={taskBoard.board_id}>
              <BoardName>
                <span>{taskBoard.board_name}</span>
              </BoardName>
              <Button
                onClick={() => {
                  navigate(`${routePath.taskBoard}/${taskBoard.board_id}`)
                }}
              >
                Select
              </Button>
            </BoardNameWrapper>
          ))}
        </BoardNameList>
      </SelectTaskBoardWrapper>
    </>
  )
}

export default SelectTaskBoard
