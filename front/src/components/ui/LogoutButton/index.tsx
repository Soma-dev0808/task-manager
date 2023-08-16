import { useNavigate } from 'react-router-dom'
import { localStorageKeys } from '@/const/localStorageKeys'
import { routePath } from '@/routes'
import { IconButton } from '../Button'
import { LogoutIcon } from '../Icons/LogoutIcon'

export const LogoutButton = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem(localStorageKeys.authToken)
    navigate(routePath.login)
  }
  return (
    <IconButton type="button" onClick={handleLogout}>
      <LogoutIcon />
    </IconButton>
  )
}
