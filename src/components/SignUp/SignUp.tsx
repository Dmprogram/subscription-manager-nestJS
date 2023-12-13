import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { FormAuthorization } from '../FormAuthorization/FormAuthorization'
import { register } from '../store/user/userActions'

export const SignUp = () => {
  const [authError, setAuthError] = useState<string | null | boolean>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleRegister = async (values: { email: string; password: string }) => {
    const { email, password } = values
    const response = await dispatch(register({ email, password }))
    if (register.fulfilled.match(response)) {
      navigate('/')
    } else if (response.payload) {
      if (Array.isArray(response.payload.message)) {
        setAuthError(response.payload.message[0])
      } else {
        setAuthError(response.payload.message)
      }
    } else {
      console.log(response.error)
    }
  }
  return (
    <FormAuthorization
      submitTitle='Sign Up'
      handleSubmit={handleRegister}
      authError={authError}
      setAuthError={setAuthError}
    />
  )
}
