import styled from 'styled-components'
import { ColorsType } from '@/styles/ThemeProvider'

const Button = styled.button<{ buttonColor?: ColorsType }>`
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ buttonColor, theme }) =>
    buttonColor ? theme.colors[buttonColor] : theme.colors.primary};
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #ffffff94;
  }
`

const IconButton = styled.button<{ buttonColor?: ColorsType }>`
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ buttonColor, theme }) =>
    buttonColor ? theme.colors[buttonColor] : theme.colors.baseBlackFocus};
`

export { IconButton, Button }
