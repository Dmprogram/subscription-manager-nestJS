import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../../firebase'
import { FormAuthorization } from '../FormAuthorization/FormAuthorization'

export const SignUp = () => {
  const [authError, setAuthError] = useState<string | null | boolean>(null)

  const navigate = useNavigate()
  const handleRegister = (
    values: { email: string; password: string },
    setFieldValue: (field: string, value: string, shouldValidate: boolean) => void,
  ) => {
    const { email, password } = values
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/'))
      .catch((error) => {
        console.log(error.code)
        if (error.code === 'auth/email-already-in-use') {
          setAuthError('A user with this e-mail already exists')
          setFieldValue('password', '', true)
        }
      })
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
