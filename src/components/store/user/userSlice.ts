import { createSlice } from '@reduxjs/toolkit'

import { TInitialState } from './types'
import { checkAuth, login, logout, register } from './userActions'

const initialState: TInitialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  isLoading: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = 'pending'
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = 'succeeded'
        state.user = payload.user
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = 'failed'
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = 'pending'
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = 'succeeded'
        state.user = payload.user
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = 'failed'
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = 'succeeded'
        state.user = null
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = 'pending'
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isLoading = 'succeeded'
        state.user = payload.user
      })
  },
})
