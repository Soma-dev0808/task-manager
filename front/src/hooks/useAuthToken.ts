import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { routePath } from '@/routes'

export const useAuthToken = () => {
  const { showToast } = useShowToast()
  const navigate = useNavigate()

  const getToken = useCallback(() => {
    const token = localStorage.getItem('token')
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
