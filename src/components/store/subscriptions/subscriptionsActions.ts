import { createAsyncThunk } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'

import { SubscriptionService } from '../../../services/subscription/subscription.service'
import { TSubscriptionCreateValues, TSubscription } from '../../../types/subscription'
import { TErrorData } from '../user/types'

export const fetchSubscriptions = createAsyncThunk<TSubscription[]>(
  'subscriptions/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await SubscriptionService.getAll()
      return response.data
    } catch (error: any) {
      const err: AxiosError<TErrorData> = error
      if (!err.response) {
        throw error
      }

      return rejectWithValue(err.response.data)
    }
  },
)
export const createSubscription = createAsyncThunk<TSubscription, TSubscriptionCreateValues>(
  'subscriptions/createSubscription',
  async (data, { rejectWithValue }) => {
    try {
      const response = await SubscriptionService.create(data)
      return response.data
    } catch (error: any) {
      const err: AxiosError<TErrorData> = error
      if (!err.response) {
        throw error
      }

      return rejectWithValue(err.response.data)
    }
  },
)
export const editSubscription = createAsyncThunk<TSubscription, TSubscription>(
  'subscriptions/editSubscription',
  async (data, { rejectWithValue }) => {
    try {
      const response = await SubscriptionService.update(data.id, data)
      return response.data
    } catch (error: any) {
      const err: AxiosError<TErrorData> = error
      if (!err.response) {
        throw error
      }

      return rejectWithValue(err.response.data)
    }
  },
)

export const deleteSubscription = createAsyncThunk<TSubscription, string>(
  'subscriptions/deleteSubscription',
  async (id, { rejectWithValue }) => {
    try {
      const response = await SubscriptionService.delete(id)
      return response.data
    } catch (error: any) {
      const err: AxiosError<TErrorData> = error
      if (!err.response) {
        throw error
      }

      return rejectWithValue(err.response.data)
    }
  },
)

export const changeSubscriptionStatus = createAsyncThunk<TSubscription, { id: string; status: boolean }>(
  'subscriptions/changeSubscriptionStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await SubscriptionService.changeStatus(id, { status })
      return response.data
    } catch (error: any) {
      const err: AxiosError<TErrorData> = error
      if (!err.response) {
        throw error
      }

      return rejectWithValue(err.response.data)
    }
  },
)
