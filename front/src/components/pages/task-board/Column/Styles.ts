import styled from 'styled-components'

import { TaskListProps } from './type'

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  min-width: 220px;
  width: 220px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.baseBlack};
  position: relative;
  flex-shrink: 0;
`

const TaskList = styled.div<TaskListProps>`
  padding: 24px 8px 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? props.theme.colors.baseBlackFocus : props.theme.colors.baseBlack};
  flex-grow: 0;
  min-height: 150px;
  border: ${({ theme }) => `1px solid ${theme.colors.baseBoarder}`};
`

export { Container, TaskList }
