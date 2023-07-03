import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeType['colors']
    fonts: ThemeType['fonts']
    fontSizes: ThemeType['fontSizes']
  }
}
