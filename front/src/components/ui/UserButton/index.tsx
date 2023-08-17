import { UserButtonDiv, UserNumber } from '@/components/pages/task-board/BoardHeader/Style'
import { useAppSelector } from '@/redux/app/hook'
import { IconButton } from '../Button'
import { UserIcon } from '../Icons/UserIcon'

export const UserButton = () => {
  const usersBoard = useAppSelector((state) => state.taskBoard.usersInTaskBoard)

  return (
    <UserButtonDiv>
      <IconButton>
        <UserIcon />
      </IconButton>
      <UserNumber>{usersBoard.length}</UserNumber>
    </UserButtonDiv>
  )
}
