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
