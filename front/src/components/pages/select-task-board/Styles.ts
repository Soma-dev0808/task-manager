import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SelectTaskBoardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const AddTaskBoardWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const BoardNameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30%;
`

const BoardNameWrapper = styled.div`
  display: flex;
  gap: 10px;
`
const BoardName = styled.div`
  flex-grow: 1;
`

const StyledLink = styled(Link)`
  color: white;
`

export {
  SelectTaskBoardWrapper,
  AddTaskBoardWrapper,
  BoardNameList,
  BoardNameWrapper,
  BoardName,
  StyledLink,
}
