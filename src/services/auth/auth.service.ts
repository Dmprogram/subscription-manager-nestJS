import axios from 'axios'

import Cookies from 'js-cookie'

import { saveToStorage } from './auth.helper'

import { getContentType } from '../../api/api.helper'
import { instance } from '../../api/api.interceptor'
import { TEmailPassword, TAuthResponse } from '../../components/store/user/types'

export const AuthService = {
  async main(type: 'login' | 'register', data: TEmailPassword) {
    const response = await instance<TAuthResponse>({
      url: `/auth/${type}`,
      method: 'POST',
      data,
    })
    if (response.data.accessToken) {
      saveToStorage(response.data)
    }
    return response.data
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken')
    const response = await axios.post<string, { data: TAuthResponse }>(
      `${import.meta.env.VITE_API_URL}/auth/login/access-token`,
      { refreshToken },
      {
        headers: getContentType(),
      },
    )
    if (response.data.accessToken) {
      saveToStorage(response.data)
    }
    return response
  },
}
