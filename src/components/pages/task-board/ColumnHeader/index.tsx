import plusIcon from 'assets/plus-button.svg'

import { Container, Title, Image, Button } from './Styles'
import { ColumnHeaderProps } from './type'

const ColumnHeader = ({ dragHandleProps, title, handlePlusClick }: ColumnHeaderProps) => (
  <Container {...dragHandleProps}>
    <Title>{title}</Title>
    <Button type="button" onClick={handlePlusClick}>
      <Image src={plusIcon} alt="plus button" />
    </Button>
  </Container>
)

export { ColumnHeader }
