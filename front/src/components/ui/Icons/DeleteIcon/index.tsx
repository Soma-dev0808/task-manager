import styled from 'styled-components'
import deleteIcon from 'assets/delete-button.svg'

const Image = styled.img`
  width: 16px;
  height: 16px;
`

const DeleteIcon = () => <Image src={deleteIcon} alt="Delete button" />

export { DeleteIcon }
