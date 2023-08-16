import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondBaseBlack};
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.baseBoarder};
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`

export const Header = ({ children }: { children: React.ReactNode }) => (
  <HeaderContainer>
    <HeaderContent>{children}</HeaderContent>
  </HeaderContainer>
)
