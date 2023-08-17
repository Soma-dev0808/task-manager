import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IconButton } from '@/components/ui/Button'
import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { useAuthToken } from '@/hooks/useAuthToken'
import { useAppDispatch, useAppSelector } from '@/redux/app/hook'
import { taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'
import { backend } from '@/repository'
import { postAddedUser } from '@/repository/addUserService'
import {
  Menu,
  MenuBarContainer,
  ColumnInputContainer,
  InputField,
  UserList,
  UserItem,
  UserSearchInputContainer,
  UserSearchContainer,
  AddUserButton,
  ExplanationForAddUser,
  SearchContainer,
  CloseButton,
  AddUserInput,
  AddButton,
  DisabledUserItem,
} from './Styles'
import { useFetchTaskData } from '../hooks/useFetchTaskData'

// TODO: Add generic type, and move it somewhere global.
const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const ref = useRef<undefined | number>()

  useEffect(() => {
    ref.current = window.setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      if (ref.current !== undefined) {
        window.clearTimeout(ref.current)
      }
    }
  }, [value, delay])

  return debouncedValue
}

// TODO: Move it to hooks folder
const useFindUser = () => {
  const [userName, setUserName] = useState('')
  const [foundUsers, setFoundUsers] = useState<
    {
      emailAddress: string
      password: string
      userId: number
      userName: string
    }[]
  >([])
  const { getToken } = useAuthToken()
  const userSearchKeyword = useDebounce(userName)

  useEffect(() => {
    const token = getToken()
    if (!token) return
    backend.users.fetchUserByKeyword(token, userSearchKeyword).then((res) => {
      setFoundUsers(
        res.data.map(
          (user: {
            email_address: string
            password: string
            user_id: number
            user_name: string
          }) => ({
            emailAddress: user.email_address,
            password: user.password,
            userId: user.user_id,
            userName: user.user_name,
          })
        )
      )
    })
  }, [userSearchKeyword, getToken])

  return { userName, setUserName, foundUsers }
}

export const MenuBar = () => {
  const [columnName, setColumnName] = useState('')
  const [isAddUserButtonClicked, setIsAddUserButtonClicked] = useState(false)
  const { userName, setUserName, foundUsers } = useFindUser()
  const isEmpty = useMemo(() => columnName === '', [columnName])
  const dispatch = useAppDispatch()
  const { getToken } = useAuthToken()
  const { boardId } = useParams()
  const { showToast } = useShowToast()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { fetchTaskData } = useFetchTaskData()
  const usersBoard = useAppSelector((state) => state.taskBoard.usersInTaskBoard)

  const handleCreateColumn = useCallback(async () => {
    const token = getToken()

    if (isEmpty || typeof token === 'undefined' || typeof boardId === 'undefined') return

    await dispatch(
      taskBoardReducerActions.createColumn({
        token,
        title: columnName,
        boardId,
      })
    )

    showToast({
      type: 'success',
      title: 'Column created',
      message: 'Column created successfully',
    })
  }, [columnName, dispatch, getToken, boardId, isEmpty, showToast])

  const handleAddUserClick = () => {
    setIsAddUserButtonClicked(!isAddUserButtonClicked)
  }

  const handleAddButtonClick = async (userId: string) => {
    const token = getToken()
    if (token && boardId) {
      await postAddedUser(token, boardId, userId)
      await fetchTaskData(boardId, token)
    }
  }

  useEffect(() => {
    if (isAddUserButtonClicked && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAddUserButtonClicked])

  return (
    <MenuBarContainer>
      <Menu>
        <div>
          Add Column:
          <ColumnInputContainer>
            <InputField value={columnName} onChange={(e) => setColumnName(e.target.value)} />
            <IconButton
              type="button"
              buttonColor="primary"
              disabled={isEmpty}
              onClick={handleCreateColumn}
            >
              <PlusIcon />
            </IconButton>
          </ColumnInputContainer>
        </div>

        <UserSearchContainer>
          <AddUserButton onClick={handleAddUserClick}>Add User</AddUserButton>

          {isAddUserButtonClicked && (
            <SearchContainer>
              <ExplanationForAddUser>
                Search user & add to taskboard
                <CloseButton onClick={() => setIsAddUserButtonClicked(false)}>✖️</CloseButton>
              </ExplanationForAddUser>
              <UserSearchInputContainer>
                <AddUserInput
                  ref={inputRef}
                  placeholder="Search User"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <UserList>
                  {foundUsers.map((user) => {
                    const isDisabled = usersBoard.includes(user.userId)
                    const ItemComponent = isDisabled ? DisabledUserItem : UserItem
                    return (
                      <ItemComponent key={user.userId}>
                        {user.userName}
                        <AddButton
                          disabled={usersBoard.includes(user.userId)}
                          onClick={() => handleAddButtonClick(user.userId.toString())}
                        >
                          {usersBoard.includes(user.userId) ? 'added' : 'add'}
                        </AddButton>
                      </ItemComponent>
                    )
                  })}
                </UserList>
              </UserSearchInputContainer>
            </SearchContainer>
          )}
        </UserSearchContainer>
      </Menu>
    </MenuBarContainer>
  )
}
