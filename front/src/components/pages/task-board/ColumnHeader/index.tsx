import { IconButton } from '@/components/ui/Button'

import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { Container, Title } from './Styles'
import { ColumnHeaderProps } from './type'

const ColumnHeader = ({ dragHandleProps, title, handlePlusClick }: ColumnHeaderProps) => (
  <Container {...dragHandleProps}>
    <Title>{title}</Title>
    <IconButton type="button" onClick={handlePlusClick}>
      <PlusIcon />
    </IconButton>
  </Container>
)

export { ColumnHeader }
