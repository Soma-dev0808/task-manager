import styled from 'styled-components'

const Button = styled.button`
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`

const IconButton = styled.button<{ $primary?: boolean }>`
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary : theme.colors.baseBlackFocus};
`

export { IconButton, Button }
