import { Header, HeaderContainer, Title } from './Style'

export const BoardHeader = ({ taskBoardName }: { taskBoardName: string | undefined }) => (
  <HeaderContainer>
    <Header>
      <Title>{taskBoardName}</Title>
    </Header>
  </HeaderContainer>
)
