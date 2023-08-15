import styled from 'styled-components'

const MenuBarContainer = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.baseBoarder};
  z-index: 99;
`

const Menu = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  gap: 20px;
`

const ColumnInputContainer = styled.div`
  display: flex;
  gap: 10px;
`

const UserSearchInputContainer = styled.div`
  position: relative;
`

const InputField = styled.input`
  height: 30px;
  border-radius: 5px;
  outline: none;
`

const UserList = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secondBaseBlack};
`

const UserItem = styled.div`
  padding: 8px 5px;
`

export {
  MenuBarContainer,
  Menu,
  ColumnInputContainer,
  UserSearchInputContainer,
  InputField,
  UserList,
  UserItem,
}
