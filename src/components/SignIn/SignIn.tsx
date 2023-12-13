import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { FormAuthorization } from '../FormAuthorization/FormAuthorization'
import { login } from '../store/user/userActions'

export const SignIn = () => {
  const dispatch = useAppDispatch()
  const [authError, setAuthError] = useState<string | null | boolean>(null)
  const navigate = useNavigate()
  const handleLogin = async (values: { email: string; password: string }) => {
    if (authError) {
      setAuthError('Please check e-mail or password')
      return
    }
    const { email, password } = values
    const response = await dispatch(login({ email, password }))

    if (login.fulfilled.match(response)) {
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
      submitTitle='Sign In'
      handleSubmit={handleLogin}
      authError={authError}
      setAuthError={setAuthError}
    />
  )
}
