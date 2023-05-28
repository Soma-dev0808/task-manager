import { useState } from 'react'
import { checkIsEmpty } from '@/libs/validations'

export const useLogin = () => {
  const [errMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { userName, password } = e.target as typeof e.target & {
      userName: { value: string }
      password: { value: string }
    }

    if (checkIsEmpty(userName.value, password.value)) {
      // TODO: Show specific error message
      setErrorMessage('Please check your input')
      return
    }
  }

  return { errMessage, onSubmit }
}
