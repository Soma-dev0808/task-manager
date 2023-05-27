import { commonTagRules } from '@/const/constants'
import {
  AddTaskContainer,
  AddTaskInput,
  CancelAddTaskButton,
  AddTaskButton,
  ButtonContainer,
} from './Style'
import { useHandleAddTask } from '../hooks/useHandleAddTask'

const ColumnInput = (props: { id: string; handleClose: () => void }) => {
  const { ref, newTaskTitle, isEmpty, handleInputChange, handleKeyDown, handleAddTask } =
    useHandleAddTask(props)
  return (
    <AddTaskContainer>
      <AddTaskInput
        maxLength={commonTagRules.maxLength}
        ref={ref}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={newTaskTitle}
      />
      <ButtonContainer>
        <CancelAddTaskButton type="button" onClick={props.handleClose}>
          Cancel
        </CancelAddTaskButton>
        <AddTaskButton type="button" disabled={isEmpty} onClick={handleAddTask}>
          Add
        </AddTaskButton>
      </ButtonContainer>
    </AddTaskContainer>
  )
}

export { ColumnInput }
