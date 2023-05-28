import { AuthForm } from '@/components/ui/Layouts'
import { useLogin } from './hooks/useLogin'

const Login = () => {
  const { errMessage, onSubmit } = useLogin()
  return (
    <>
      <AuthForm onSubmit={onSubmit} errorMessage={errMessage}>
        <AuthForm.Title>Login</AuthForm.Title>
        <AuthForm.Input id="user_name" name="userName" label="User Name" />
        <AuthForm.Input id="password" name="password" label="Password" type="password" />
        <AuthForm.SubmitButton>Submit</AuthForm.SubmitButton>
      </AuthForm>
    </>
  )
}

export default Login
