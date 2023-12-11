import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../../firebase'
import { FormAuthorization } from '../FormAuthorization/FormAuthorization'

export const SignIn = () => {
  const [authError, setAuthError] = useState<string | null | boolean>(null)

  const navigate = useNavigate()
  const handleLogin = (values: { email: string; password: string }) => {
    if (authError) {
      setAuthError('Please check e-mail or password')
      return
    }
    const { email, password } = values
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === 'auth/invalid-login-credentials') {
          setAuthError('Incorrect email or password')
        }
        if (error.code === 'auth/too-many-requests') {
          setAuthError('Please try later, too many attempts')
        }
      })
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
