import React from 'react'
import { ThemeProvider } from 'styled-components'

const colorPallet = {
  baseBlack: '#242424',
  danger: '#ff5252',
  scaleGreen40: '#51E1B5',
  scaleGreen50: '#00BE84',
  scaleGreen60: '#0EA97A',
  scaleGreen70: '#158966',
  scaleGreen80: '#0E6E51',
  scaleGrey40: '#6E7681',
  scaleGrey50: '#484F58',
  scaleGrey60: '#30363D',
  scaleGrey70: '#21262D',
  scaleGrey80: '#161B22',
}

const theme = {
  colors: {
    baseBlack: colorPallet.baseBlack,
    baseBlackFocus: colorPallet.scaleGrey80,
    baseBoarder: colorPallet.scaleGrey50,
    primary: colorPallet.scaleGreen60,
    default: colorPallet.scaleGrey50,
    danger: colorPallet.danger,
    secondBaseBlack: colorPallet.scaleGrey80,
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
}

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
