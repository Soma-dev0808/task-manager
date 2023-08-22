import styled from 'styled-components'
import userIcon from 'assets/user-button.svg'

const Image = styled.img`
  width: 25px;
  height: 25px;
`

const UserIcon = () => <Image src={userIcon} alt="user button" />

export { UserIcon }
