const checkIsEmpty = (...args: string[]) => args.some((arg) => arg === '')
const checkIsValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email)
const checkIsSamePassword = (password: string, passwordConfirmation: string) =>
  password === passwordConfirmation

export { checkIsEmpty, checkIsValidEmail, checkIsSamePassword }
