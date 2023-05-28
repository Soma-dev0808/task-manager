import { AuthForm } from '@/components/ui/Layouts'
import { useRegistration } from './hooks/useRegistration'

const Register = () => {
  const { onSubmit, errMessage } = useRegistration()
  return (
    <>
      <AuthForm onSubmit={onSubmit} errorMessage={errMessage}>
        <AuthForm.Title>SignUp</AuthForm.Title>
        <AuthForm.Input id="user_name" name="userName" label="User Name" />
        <AuthForm.Input id="email_address" name="emailAddress" label="Email" type="email" />
        <AuthForm.Input id="password" name="password" label="Password" type="password" />
        <AuthForm.Input
          id="password_confirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
        />
        <AuthForm.SubmitButton>Submit</AuthForm.SubmitButton>
      </AuthForm>
    </>
  )
}

export default Register
