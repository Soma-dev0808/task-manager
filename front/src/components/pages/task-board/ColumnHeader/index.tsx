import { IconButton } from '@/components/ui/Button'

import { DeleteIcon } from '@/components/ui/Icons/DeleteIcon'
import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { ButtonsContainer, Container, Title } from './Styles'
import { ColumnHeaderProps } from './type'

const ColumnHeader = ({
  id,
  dragHandleProps,
  title,
  handlePlusClick,
  handleToggleDeleteColumnModal,
}: ColumnHeaderProps) => (
  <Container {...dragHandleProps}>
    <Title>{title}</Title>
    <ButtonsContainer>
      <IconButton type="button" onClick={handlePlusClick}>
        <PlusIcon />
      </IconButton>
      <IconButton
        type="button"
        buttonColor="danger"
        onClick={() => handleToggleDeleteColumnModal(id)}
      >
        <DeleteIcon />
      </IconButton>
    </ButtonsContainer>
  </Container>
)

export { ColumnHeader }
