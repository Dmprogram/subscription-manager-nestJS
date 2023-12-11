import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useLayoutEffect, useRef } from 'react'

import classes from './FormAuthorization.module.css'

import { validationRegister, validationSignIn } from '../utils/validationRegister'

interface FormAuthorizationProps {
  submitTitle: string

  handleSubmit: (
    values: { email: string; password: string },
    setFieldValue: (field: string, value: string, shouldValidate: boolean) => void,
  ) => void
  setAuthError: (authError: string | boolean | null) => void
  authError: string | boolean | null
}

export const FormAuthorization: React.FC<FormAuthorizationProps> = ({
  submitTitle,
  handleSubmit,
  authError,
  setAuthError,
}) => {
  const emailRef = useRef<HTMLInputElement>(null)
  useLayoutEffect(() => {
    if (emailRef.current && authError !== false) {
      emailRef.current.focus()
    }
  }, [authError])

  const initialValues = {
    email: '',
    password: '',
  }
  const renderError = (message: string) => <div className={classes.error}>{message}</div>
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={submitTitle === 'Sign In' ? validationSignIn : validationRegister}
      onSubmit={(values, { setFieldValue }) => {
        handleSubmit(values, setFieldValue)
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={classes.form}>
          <div className={classes.field}>
            <label htmlFor='email' className={classes.label}>
              Email
            </label>
            <Field
              className={classes.input}
              type='email'
              name='email'
              id='email'
              placeholder='john@example.com'
              innerRef={emailRef}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('email', ev.target.value, true)
                if (authError) {
                  setAuthError(false)
                }
              }}
            />
            <ErrorMessage name='email' render={renderError} />
          </div>
          <div className={classes.field}>
            <label htmlFor='password' className={classes.label}>
              Password
            </label>
            <Field
              className={classes.input}
              type='password'
              name='password'
              id='password'
              placeholder='********'
              value={values.password}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('password', ev.target.value, true)
                if (authError) {
                  setAuthError(false)
                }
              }}
            />
            {authError ? (
              <div className={classes.error}>{authError}</div>
            ) : (
              <ErrorMessage name='password' render={renderError} />
            )}
          </div>

          <button className={classes.inputSubmit} type='submit'>
            {submitTitle}
          </button>
        </Form>
      )}
    </Formik>
  )
}
