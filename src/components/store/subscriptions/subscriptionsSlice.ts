import { createSlice } from '@reduxjs/toolkit'

import { createSubscription, editSubscription, deleteSubscription, fetchSubscriptions } from './subscriptionsActions'
import { TSubscriptionsState } from './types'

import { sortByParameter } from '../../../utils/sortByParameter'

import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  loading: 'idle',
  error: null,
  subscriptions: [],
  inputSearch: '',
  sortByParameter: null,
} as TSubscriptionsState

export const subscriptionsSlice = createSlice({
  name: 'subscriptionsList',
  initialState,
  reducers: {
    resetState: () => initialState,

    findSubscription(state, action: PayloadAction<{ inputSearch: string }>) {
      state.inputSearch = action.payload.inputSearch
    },

    changeStatus(state, action: PayloadAction<{ status: boolean; id: number }>) {
      const subscription = state.fetchedSubscriptions.find((el) => el.id === action.payload.id)
      if (subscription !== undefined) {
        subscription.status = action.payload.status
        state.activeSubscriptions = state.fetchedSubscriptions.filter((el) => el.status)
        state.inactiveSubscriptions = state.fetchedSubscriptions.filter((el) => !el.status)
        state.searchSubsciptions.forEach((el, index) => {
          if (el.id === subscription.id) {
            state.searchSubsciptions[index] = subscription
          }
        })
      }
    },

    clearSearchAndSortFields(state) {
      state.inputSearch = ''
    },

    addSortByParameter(state, action: PayloadAction<{ sortByParameter: string | null }>) {
      state.sortByParameter = action.payload.sortByParameter

      state.subscriptions = sortByParameter(state.subscriptions, state.sortByParameter)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.error = null

        state.subscriptions = sortByParameter(action.payload, null)
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(createSubscription.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.subscriptions.push(action.payload)
        state.loading = 'succeeded'

        // state.isSubCreateSnackBar = true
        // state.subNameForSnackBar = action.payload.name
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(editSubscription.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(editSubscription.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        const editSubscriptionIndex = state.subscriptions.findIndex((el) => el.id === action.payload.id)
        state.subscriptions[editSubscriptionIndex] = action.payload
        // state.isSubCreateSnackBar = true
        // state.subNameForSnackBar = action.payload.name
      })
      .addCase(editSubscription.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        const deleteSubscriptionIndex = state.subscriptions.findIndex((el) => el.id === action.payload.id)
        state.subscriptions.splice(deleteSubscriptionIndex, 1)
        // state.isSubCreateSnackBar = true
        // state.subNameForSnackBar = action.payload.name
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
  },
})

export const {
  findSubscription,
  clearSearchAndSortFields,
  addSortByParameter,
  changeStatus,

  resetState,
} = subscriptionsSlice.actions
