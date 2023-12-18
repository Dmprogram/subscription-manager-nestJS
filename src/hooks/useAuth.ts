import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useActions } from './useActions'
import { useAppSelector } from './useReduxHooks'

import { getAccessToken, getRefreshToken } from '../services/auth/auth.helper'

export const useAuth = () => {
  const { pathname } = useLocation()
  const user = useAppSelector((state) => state.user)
  const { checkAuth, logout } = useActions()
  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) checkAuth()
  }, [])

  useEffect(() => {
    const refreshToken = getRefreshToken()
    if (!refreshToken && user.user) logout()
  }, [pathname])

  return { isAuth: Boolean(user.user), isLoading: user.isLoading }
}
