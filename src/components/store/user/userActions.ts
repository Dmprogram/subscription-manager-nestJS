import { createAsyncThunk } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'

import { TAuthResponse, TEmailPassword, TValidationErrors } from './types'

import { errorCatch } from '../../../api/api.helper'
import { removeFromStorage } from '../../../services/auth/auth.helper'
import { AuthService } from '../../../services/auth/auth.service'

export const register = createAsyncThunk<
  TAuthResponse,
  TEmailPassword,
  {
    rejectValue: TValidationErrors
  }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.main('register', data)
    return response
  } catch (error: any) {
    const err: AxiosError<TValidationErrors> = error
    if (!err.response) {
      throw error
    }
    return rejectWithValue(err.response.data)
  }
})

export const login = createAsyncThunk<
  TAuthResponse,
  TEmailPassword,
  {
    rejectValue: TValidationErrors
  }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.main('login', data)
    return response
  } catch (error: any) {
    const err: AxiosError<TValidationErrors> = error
    if (!err.response) {
      throw error
    }
    return rejectWithValue(err.response.data)
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
