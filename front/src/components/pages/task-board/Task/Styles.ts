import styled from 'styled-components'

import { ContainerProps } from './type'

const Container = styled.div<ContainerProps>`
  border: ${({ theme }) => `1px solid ${theme.colors.baseBoarder}`};
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? '#4660F9' : props.theme.colors.secondBaseBlack};
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 500;
`

export { Container }
