import { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'

const AuthFormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Form = styled.form`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 250px;
`

const ErrorMessage = styled.p`
  background-color: #b53b4b;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
`

export const AuthForm = ({
  onSubmit,
  errorMessage,
  children,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>
  errorMessage: string | undefined
  children: ReactNode
}) => {
  return (
    <AuthFormWrapper>
      <Form onSubmit={onSubmit}>{children}</Form>
      {typeof errorMessage === 'string' && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </AuthFormWrapper>
  )
}

const FormTitle = styled.h2`
  margin: 0;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Input = styled.input`
  padding: 5px;
`

const SubmitButton = styled.button`
  padding: 10px 10px;
`

// Uncontrolled component
const FormTextInput = ({
  label,
  type = 'text',
  ...rest
}: {
  id: string
  name: string
  label: string
  type?: ComponentProps<'input'>['type']
}) => (
  <InputWrapper>
    <label htmlFor={rest.id}>{label}</label>
    <Input required type={type} {...rest} />
  </InputWrapper>
)

AuthForm.Title = FormTitle
AuthForm.Input = FormTextInput
AuthForm.SubmitButton = SubmitButton
