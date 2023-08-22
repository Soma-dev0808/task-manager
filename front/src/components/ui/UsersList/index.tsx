import { AddButton, DisabledUserItem, UserItem } from '@/components/pages/task-board/MenuBar/Styles'
import { useAppSelector } from '@/redux/app/hook'
import { UserInTaskBoardType } from '@/redux/feature/taskBoardSlice/type'

type UsersListType = {
  foundUsers: UserInTaskBoardType[]
  onClick: (event: string) => void
}

function UsersList({ foundUsers, onClick }: UsersListType) {
  const usersBoard = useAppSelector((state) => state.taskBoard.usersInTaskBoard)
  return (
    <>
      {foundUsers.map((user) => {
        const isDisabled = usersBoard.includes(user.userId)
        const ItemComponent = isDisabled ? DisabledUserItem : UserItem

        return (
          <ItemComponent key={user.userId}>
            {user.userName}
            <AddButton
              disabled={usersBoard.includes(user.userId)}
              onClick={() => onClick(user.userId.toString())}
            >
              {usersBoard.includes(user.userId) ? 'added' : 'add'}
            </AddButton>
          </ItemComponent>
        )
      })}
    </>
  )
}

export default UsersList
