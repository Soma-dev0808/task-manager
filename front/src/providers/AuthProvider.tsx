import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../const/localStorageKeys'
import { routePath } from '../routes'

const authExceptionRoutes = [routePath.root, routePath.login, routePath.registration]

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (authExceptionRoutes.includes(location.pathname)) return
    const authToken = localStorage.getItem(localStorageKeys.authToken)
    if (!authToken) {
      navigate(routePath.login)
    }
  }, [location.pathname, navigate])

  return <>{children}</>
}
