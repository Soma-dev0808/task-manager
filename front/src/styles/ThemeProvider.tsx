import React from 'react'
import { ThemeProvider } from 'styled-components'

const colorPallet = {
  baseBlack: '#242424',
  baseWhite: 'white',
  secondaryBlack: '#313131',
  danger: '#ff5252',
  scaleBlue40: '#4660F9',
  scaleBlue80: '#0D1856',
  scaleGreen40: '#51E1B5',
  scaleGreen50: '#00BE84',
  scaleGreen60: '#0EA97A',
  scaleGreen70: '#158966',
  scaleGreen80: '#0E6E51',
  scaleGrey40: '#6E7681',
  scaleGrey50: '#484F58',
  scaleGrey55: '#5e5b5bab',
  scaleGrey60: '#30363D',
  scaleGrey70: '#21262D',
  scaleGrey80: '#161B22',
} as const

const theme = {
  colors: {
    baseBlack: colorPallet.baseBlack,
    baseWhite: colorPallet.baseWhite,
    secondaryBlack: colorPallet.secondaryBlack,
    baseBlackFocus: colorPallet.scaleGrey80,
    baseBoarder: colorPallet.scaleGrey50,
    primary: colorPallet.scaleGreen60,
    secondary: colorPallet.scaleBlue40,
    secondaryDark: colorPallet.scaleBlue80,
    default: colorPallet.scaleGrey50,
    danger: colorPallet.danger,
    secondBaseBlack: colorPallet.scaleGrey80,
    darkGrey: colorPallet.scaleGrey55,
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
} as const

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

type ThemeType = typeof theme
type ColorsType = keyof ThemeType['colors']
type FontType = keyof ThemeType['fonts']
type FontSizeType = keyof ThemeType['fontSizes']

export type { ThemeType, ColorsType, FontType, FontSizeType }

export default Theme
