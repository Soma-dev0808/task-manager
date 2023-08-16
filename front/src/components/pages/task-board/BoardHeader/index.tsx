import { Header } from '@/components/ui/Header'
import { LogoutButton } from '@/components/ui/LogoutButton'
import { Title } from './Style'

export const BoardHeader = ({ taskBoardName }: { taskBoardName: string | undefined }) => (
  <Header>
    <Title>{taskBoardName}</Title>
    <LogoutButton />
  </Header>
)
