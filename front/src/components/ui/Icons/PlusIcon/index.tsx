import styled from 'styled-components'
import plusIcon from 'assets/plus-button.svg'

const Image = styled.img`
  width: 10px;
  height: 10px;
`

const PlusIcon = () => <Image src={plusIcon} alt="plus button" />

export { PlusIcon }
