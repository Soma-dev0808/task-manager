import styled from 'styled-components'

const AddTaskContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.baseBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
  position: absolute;
  top: 48px; // header height + 2px
  border: ${({ theme }) => `1px solid ${theme.colors.baseBoarder}`};
  box-sizing: border-box;
`
const AddTaskInput = styled.input`
  width: 90%;
  height: 30px;
`

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: end;
  margin-top: 5px;
`

const AddTaskButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
`

const CancelAddTaskButton = styled.button`
  margin-right: 5px;
  outline: none;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`

export { AddTaskContainer, ButtonContainer, AddTaskButton, CancelAddTaskButton, AddTaskInput }
