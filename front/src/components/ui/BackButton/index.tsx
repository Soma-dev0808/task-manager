import { useNavigate } from 'react-router-dom'
import { routePath } from '@/routes'
import { IconButton } from '../Button'
import { BackIcon } from '../Icons/BackIcon'

export const BackButton = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(routePath.selectTaskBoard)
  }
  return (
    <IconButton type="button" onClick={handleGoBack}>
      <BackIcon />
    </IconButton>
  )
}
