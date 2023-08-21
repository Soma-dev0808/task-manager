import styled from 'styled-components'
import backIcon from 'assets/arrowLeft-button.svg'

const Image = styled.img`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.baseBlack};
`

const BackIcon = () => <Image src={backIcon} alt="Delete button" />

export { BackIcon }
