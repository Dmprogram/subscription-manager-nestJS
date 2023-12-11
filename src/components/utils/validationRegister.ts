import * as Yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(Yup)
export const validationRegister = Yup.object({
  email: Yup.string().email('Invalid email').required('Please enter an email'),
  password: Yup.string()
    .password()
    .minUppercase(1, 'Password must contain at least 1 uppercase letter')
    .minLowercase(1, 'Password must contain at least 1 lowercase letter')
    .minNumbers(1, 'Password must contain at least 1 number')
    .min(6, 'Password must be at least 6 characters')
    .minSymbols(0)
    .required('Please enter a password'),
})
export const validationSignIn = Yup.object({
  email: Yup.string().email('Invalid email').required('Please enter an email'),
  password: Yup.string().minSymbols(0).required('Please enter a password'),
})
