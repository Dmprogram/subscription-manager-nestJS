import { createAsyncThunk } from '@reduxjs/toolkit'

import { TAuthResponse, TEmailPassword } from './types'

import { errorCatch } from '../../../api/api.helper'
import { removeFromStorage } from '../../../services/auth/auth.helper'
import { AuthService } from '../../../services/auth/auth.service'

export const register = createAsyncThunk<TAuthResponse, TEmailPassword>('auth/register', async (data, thunkApi) => {
  try {
    const response = await AuthService.main('register', data)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const login = createAsyncThunk<TAuthResponse, TEmailPassword>('auth/login', async (data, thunkApi) => {
  try {
    const response = await AuthService.main('login', data)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  removeFromStorage()
})

export const checkAuth = createAsyncThunk<TAuthResponse>(
  'auth,check-auth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.getNewTokens()
      return response.data
    } catch (error) {
      if (errorCatch(error) === 'jwt expired') {
        dispatch(logout())
      }
      return rejectWithValue(error)
    }
  },
)
