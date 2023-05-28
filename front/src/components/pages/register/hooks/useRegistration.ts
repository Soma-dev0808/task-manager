import { useState } from 'react'
import { checkIsEmpty, checkIsValidEmail, checkIsSamePassword } from '@/libs/validations'

export const useRegistration = () => {
  const [errMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { userName, emailAddress, password, passwordConfirmation } =
      e.target as typeof e.target & {
        userName: { value: string }
        emailAddress: { value: string }
        password: { value: string }
        passwordConfirmation: { value: string }
      }

    if (
      checkIsEmpty(
        userName.value,
        emailAddress.value,
        password.value,
        passwordConfirmation.value
      ) ||
      !checkIsValidEmail(emailAddress.value) ||
      !checkIsSamePassword(password.value, passwordConfirmation.value)
    ) {
      // TODO: Show specific error message
      setErrorMessage('Please check your input')
      return
    }
  }

  return { errMessage, onSubmit }
}
