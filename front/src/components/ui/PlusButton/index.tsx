import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { IconButton } from '../Button'

type PlusButtonType = {
  isEmpty?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const PlusButton = ({ isEmpty, onClick }: PlusButtonType) => {
  return (
    <IconButton type="button" buttonColor="primary" disabled={isEmpty} onClick={onClick}>
      <PlusIcon />
    </IconButton>
  )
}
