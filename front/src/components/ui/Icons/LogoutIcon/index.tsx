import styled from 'styled-components'
import logoutIcon from 'assets/logout-button.svg'

const Image = styled.img`
  width: 20px;
  height: 20px;
`

const LogoutIcon = () => <Image src={logoutIcon} alt="Delete button" />

export { LogoutIcon }
