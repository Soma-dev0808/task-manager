import styled from 'styled-components'

import { ContainerProps } from './type'

const Container = styled.div<ContainerProps>`
  border: ${({ theme }) => `1px solid ${theme.colors.baseBoarder}`};
  border-radius: 5px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? '#4660F9' : props.theme.colors.secondBaseBlack};
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 500;
`

const TitleContainer = styled.div`
  padding: 8px;
`

const TaskId = styled.div`
  font-size: 12px;
`

const TaskTitle = styled.p`
  margin: 0;
`

const TaskBriefDetail = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.baseBoarder}`};
`

const Estimate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  font-size: 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => `${theme.colors.secondary}`};
`

export { Container, TitleContainer, TaskId, TaskTitle, TaskBriefDetail, Estimate }
