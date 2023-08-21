import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IconButton } from '@/components/ui/Button'
import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { PlusButton } from '@/components/ui/PlusButton'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { useAuthToken } from '@/hooks/useAuthToken'
import { useAppDispatch } from '@/redux/app/hook'
import { taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'
import { backend } from '@/repository'
import {
  Menu,
  MenuBarContainer,
  ColumnInputContainer,
  InputField,
  UserList,
  UserItem,
  UserSearchInputContainer,
} from './Styles'

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
  const { userName, setUserName, foundUsers } = useFindUser()
  const isEmpty = useMemo(() => columnName === '', [columnName])
  const dispatch = useAppDispatch()
  const { getToken } = useAuthToken()
  const { boardId } = useParams()
  const { showToast } = useShowToast()

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

  return (
    <MenuBarContainer>
      <Menu>
        <div>
          Add Column:
          <ColumnInputContainer>
            <InputField value={columnName} onChange={(e) => setColumnName(e.target.value)} />
            <PlusButton isEmpty={isEmpty} onClick={handleCreateColumn} />
          </ColumnInputContainer>
        </div>

        <div>
          Find User:
          <UserSearchInputContainer>
            <InputField value={userName} onChange={(e) => setUserName(e.target.value)} />
            <UserList>
              {foundUsers.map((user) => (
                <UserItem key={user.userId}>{user.userName}</UserItem>
              ))}
            </UserList>
          </UserSearchInputContainer>
        </div>
      </Menu>
    </MenuBarContainer>
  )
}
