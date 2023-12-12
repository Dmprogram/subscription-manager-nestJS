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
  isLoading: boolean
}

export type TEmailPassword = {
  email: string
  password: string
}

export type TAuthResponse = TTokens & {
  user: TUser
}
