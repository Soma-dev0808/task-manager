import styled from 'styled-components'

const MenuBarContainer = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.baseBoarder};
`

const Menu = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
`

const ColumnInputContainer = styled.div`
  display: flex;
  gap: 10px;
`

export { MenuBarContainer, Menu, ColumnInputContainer }
