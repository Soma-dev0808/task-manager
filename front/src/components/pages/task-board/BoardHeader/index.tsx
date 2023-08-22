import { Header } from '@/components/ui/Header'
import { LogoutButton } from '@/components/ui/LogoutButton'
import { UserButton } from '@/components/ui/UserButton'
import { Title, Buttons } from './Style'

export const BoardHeader = ({ taskBoardName }: { taskBoardName: string | undefined }) => (
  <Header>
    <Title>{taskBoardName}</Title>
    <Buttons>
      <UserButton />
      <LogoutButton />
    </Buttons>
  </Header>
)
