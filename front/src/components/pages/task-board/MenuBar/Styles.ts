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

const UserSearchContainer = styled.div`
  position: relative;
  width: 100%;
`

const AddUserButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondBaseBlack};
  width: 200px;
  height: 30px;

  &:hover {
    pointer: cursor;
  }
`

const ColumnInputContainer = styled.div`
  display: flex;
  gap: 10px;
`

const UserSearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SearchContainer = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  width: 250px;
  background-color: ${({ theme }) => theme.colors.secondBaseBlack};
`

const ExplanationForAddUser = styled.div`
  padding: 0 5px;
  margin: 0;
  height: 40px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const CloseButton = styled.button`
  font-size: 17px;
  padding: 0 3px;
  color: ${({ theme }) => theme.colors.baseWhite};
`

const AddUserInput = styled.input`
  background-color: ${({ theme }) => theme.colors.secondBaseBlack};
  color: ${({ theme }) => theme.colors.baseWhite};
  width: 230px;
  height: 30px;
  outline: none;
  border: 0.2px solid grey;
  border-radius: 5px;
  padding-left: 10px;
`

const InputField = styled.input`
  height: 30px;
  border-radius: 5px;
  outline: none;
  border: 0;
`

const UserList = styled.div`
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondBaseBlack};
  height: 250px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.darkGrey};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.secondBaseBlack};
  }
`

const AddButton = styled.button`
  font-size: 12px;
  width: 54px;
  border: solid 1px grey;
  padding: 4px 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }

  &:disabled {
    cursor: auto;
    background-color: ${({ theme }) => theme.colors.darkGrey};
    border: none;

    &:hover {
      border: none;
    }
  }
`

const UserItem = styled.div`
  width: 220px;
  border-bottom: 0.5px solid grey;
  padding: 8px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGrey};
    cursor: pointer;
  }

  &:hover ${AddButton} {
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }

  &:last-child {
    border-bottom: none;
  }
`

const DisabledUserItem = styled(UserItem)`
  background-color: ${({ theme }) => theme.colors.darkGrey};

  &:hover {
    cursor: default;
  }
`

export {
  MenuBarContainer,
  Menu,
  ColumnInputContainer,
  UserSearchInputContainer,
  InputField,
  UserList,
  UserItem,
  UserSearchContainer,
  AddUserButton,
  ExplanationForAddUser,
  SearchContainer,
  CloseButton,
  AddUserInput,
  AddButton,
  DisabledUserItem,
}
