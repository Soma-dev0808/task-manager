import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SelectTaskBoardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

const AddTaskBoardWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const BoardNameList = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  max-height: 70%;
  overflow-y: scroll;
  border-radius: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const BoardNameWrapper = styled.div`
  display: flex;
  border-bottom: solid 1px #fff;
  padding: 20px 10px;
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.secondaryBlack};
  }
  &:last-child {
    border-bottom: none;
  }
`
const BoardName = styled.div`
  flex-grow: 1;
  font-weight: bold;
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
