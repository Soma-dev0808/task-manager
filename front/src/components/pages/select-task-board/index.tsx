import { Button } from '@/components/ui/Button'
import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { useSelectTaskBoard } from './hooks/useSelectTaskBoard'
import { AddTaskBoardWrapper, SelectTaskBoardWrapper } from './Styles'

const SelectTaskBoard = () => {
  const { taskBoardList, handleCreateTaskBoard, setAddTaskInput, addTaskInput } =
    useSelectTaskBoard()

  return (
    <SelectTaskBoardWrapper>
      <h1>Select Task Board</h1>
      <AddTaskBoardWrapper>
        <input value={addTaskInput} onChange={(e) => setAddTaskInput(e.target.value)} />
        <Button onClick={() => handleCreateTaskBoard(addTaskInput)}>
          <PlusIcon />
        </Button>
      </AddTaskBoardWrapper>
      <div>
        {taskBoardList.map((taskBoard) => (
          <div key={taskBoard.board_id}>
            Board name: <span>{taskBoard.board_name}</span>
          </div>
        ))}
      </div>
    </SelectTaskBoardWrapper>
  )
}

export default SelectTaskBoard
