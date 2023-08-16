import axios from 'axios'
import { localStorageKeys } from '@/const/localStorageKeys'

const postRegistration = async (emailAddress: string, userName: string, password: string) => {
  // TODO: Add middleware.
  // TODO: Add snakeToCamelCase middleware
  const res = await axios
    .post(
      `${import.meta.env.VITE_NODEJS_SERVER}/api/auth/register`,
      {
        email_address: emailAddress,
        user_name: userName,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((err) => err.response)

  if (res.status !== 200) {
    return res
  }

  const { token } = await res.data
  // TODO: improve security cookie?
  localStorage.setItem(localStorageKeys.authToken, token)

  return res
}

const postLogin = async (userName: string, password: string) => {
  // TODO: Add snakeToCamelCase middleware
  const res = await axios
    .post(
      `${import.meta.env.VITE_NODEJS_SERVER}/api/auth/login`,
      {
        user_name: userName,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((err) => err.response)

  if (res.status !== 200) {
    return res
  }

  const { token } = await res.data
  // TODO: improve security
  localStorage.setItem(localStorageKeys.authToken, token)

  return res
}

export const authImpl = { postRegistration, postLogin }
