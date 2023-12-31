import { TUser } from '../../../types/user'

export type TUserState = {
  email: string
}

export type TTokens = {
  accessToken: string
  refreshToken: string
}

export type TInitialState = {
  user: TUserState | null
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export type TEmailPassword = {
  email: string
  password: string
}

export type TAuthResponse = TTokens & {
  user: TUser
}
export type TErrorData = {
  error: string
  message: string | string[]
  statusCode: number
}
