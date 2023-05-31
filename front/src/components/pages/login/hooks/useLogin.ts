import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkIsEmpty } from '@/libs/validations'
import { backend } from '@/repository'
import { routePath } from '@/routes'

export const useLogin = () => {
  const [errMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(undefined)

    const { userName, password } = e.target as typeof e.target & {
      userName: { value: string }
      password: { value: string }
    }

    if (checkIsEmpty(userName.value, password.value)) {
      // TODO: Show specific error message
      setErrorMessage('Please check your input')
      return
    }

    const res = await backend.auth.postLogin(userName.value, password.value)

    if (res.status !== 200) {
      const { message } = await res.data
      setErrorMessage(message ?? 'Something went wrong')
      return
    }

    navigate(routePath.selectTaskBoard)
  }

  return { errMessage, onSubmit }
}
