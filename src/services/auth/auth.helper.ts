import Cookies from 'js-cookie'

import { TAuthResponse, TTokens } from '../../components/store/user/types'

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
}
export const getRefreshToken = () => {
  const refreshToken = Cookies.get('refreshToken')
  return refreshToken || null
}
export const getUserFromStorage = () => JSON.parse(localStorage.getItem('user') || '{}')

export const saveTokensStorage = (data: TTokens) => {
  Cookies.set('accessToken', data.accessToken)
  Cookies.set('refreshToken', data.refreshToken)
}
export const removeFromStorage = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  localStorage.removeItem('user')
}

export const saveToStorage = (data: TAuthResponse) => {
  saveTokensStorage(data)
  localStorage.setItem('user', JSON.stringify(data.user))
}
