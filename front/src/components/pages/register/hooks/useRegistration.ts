import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkIsEmpty, checkIsValidEmail, checkIsSamePassword } from '@/libs/validations'
import { backend } from '@/repository'
import { routePath } from '@/routes'

export const useRegistration = () => {
  const [errMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(undefined)
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

    // TODO: Add middleware or axios.
    // TODO: Add snakeToCamelCase middleware
    const res = await backend.auth.postRegistration(
      emailAddress.value,
      userName.value,
      password.value
    )

    if (res.status !== 200) {
      const { message } = await res.data
      setErrorMessage(message ?? 'Something went wrong')
      return
    }

    navigate(routePath.selectTaskBoard)
  }

  return { errMessage, onSubmit }
}
