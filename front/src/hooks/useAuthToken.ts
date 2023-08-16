import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { localStorageKeys } from '@/const/localStorageKeys'
import { routePath } from '@/routes'

export const useAuthToken = () => {
  const { showToast } = useShowToast()
  const navigate = useNavigate()

  const getToken = useCallback(() => {
    const token = localStorage.getItem(localStorageKeys.authToken)
    if (token === null) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Please login',
      })
      navigate(routePath.login)
      return
    }
    return token
  }, [showToast, navigate])

  return { getToken }
}
