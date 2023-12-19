import { createSlice } from '@reduxjs/toolkit'

import { createSubscription, fetchSubscriptions } from './subscriptionsActions'
import { TSubscriptionsState } from './types'

import { TSubscription } from '../../../types/subscription'
import { countAverageExpenses } from '../../utils/countAverageExpenses'
import { sortByParameter } from '../../utils/sortByParameter'
import { sortPaymentsToOldest } from '../../utils/sortPaymentsToOldest'

import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  loading: 'idle',
  error: null,
  fetchedSubscriptions: [],
  activeSubscriptions: [],
  inactiveSubscriptions: [],
  upcomingPayments: [],
  searchSubsciptions: [],
  inputSearch: '',
  sortByParameter: null,
  averageExpenses: {
    averageExpensesRub: null,
    averageExpensesUsd: null,
    averageExpensesEur: null,
  },
} as TSubscriptionsState

export const subscriptionsSlice = createSlice({
  name: 'subscriptionsList',
  initialState,
  reducers: {
    resetState: () => initialState,

    findSubscription(state, action: PayloadAction<{ inputSearch: string }>) {
      state.inputSearch = action.payload.inputSearch
      state.searchSubsciptions = state.fetchedSubscriptions.filter((el) =>
        el.name.toLowerCase().startsWith(action.payload.inputSearch.toLowerCase()),
      )
    },

    updateUpcomingPayments(state) {
      state.upcomingPayments = sortPaymentsToOldest(state.activeSubscriptions, 3)
      state.averageExpenses = countAverageExpenses(state.activeSubscriptions)
    },

    addSubscription(state, action: PayloadAction<{ newSubscription: TSubscription }>) {
      state.fetchedSubscriptions.push(action.payload.newSubscription)
      state.activeSubscriptions.push(action.payload.newSubscription)
    },

    deleteSubscription(state, action: PayloadAction<{ subscriptionId: number }>) {
      state.activeSubscriptions = state.activeSubscriptions.filter((el) => el.id !== action.payload.subscriptionId)

      state.inactiveSubscriptions = state.inactiveSubscriptions.filter((el) => el.id !== action.payload.subscriptionId)
    },
    editSubscription(state, action: PayloadAction<{ editedSubscription: TSubscription }>) {
      const subscriptionActiveIndex = state.activeSubscriptions.findIndex(
        (el) => el.id === action.payload.editedSubscription.id,
      )
      const subscriptionInactiveIndex = state.inactiveSubscriptions.findIndex(
        (el) => el.id === action.payload.editedSubscription.id,
      )
      const subscriptionIndex = state.fetchedSubscriptions.findIndex(
        (el) => el.id === action.payload.editedSubscription.id,
      )
      state.fetchedSubscriptions[subscriptionIndex] = action.payload.editedSubscription
      state.activeSubscriptions[subscriptionActiveIndex] = action.payload.editedSubscription
      state.inactiveSubscriptions[subscriptionInactiveIndex] = action.payload.editedSubscription
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

    clearAverageExpenses(state) {
      state.averageExpenses = {
        averageExpensesRub: null,
        averageExpensesUsd: null,
        averageExpensesEur: null,
      }
    },

    addSortByParameter(state, action: PayloadAction<{ sortByParameter: string | null }>) {
      state.sortByParameter = action.payload.sortByParameter
      state.activeSubscriptions = sortByParameter(
        state.fetchedSubscriptions.filter((el) => el.status),
        state.sortByParameter,
      )
      state.inactiveSubscriptions = sortByParameter(
        state.fetchedSubscriptions.filter((el) => !el.status),
        state.sortByParameter,
      )
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

        state.fetchedSubscriptions = action.payload

        state.activeSubscriptions = state.fetchedSubscriptions.filter((el) => el.status)

        state.inactiveSubscriptions = state.fetchedSubscriptions.filter((el) => !el.status)

        state.averageExpenses = countAverageExpenses(state.activeSubscriptions)

        state.upcomingPayments = sortPaymentsToOldest(state.activeSubscriptions, 3)

        state.searchSubsciptions = state.fetchedSubscriptions.filter((el) =>
          el.name.toLowerCase().startsWith(state.inputSearch.toLowerCase()),
        )
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(createSubscription.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.fetchedSubscriptions.push(action.payload)
        state.activeSubscriptions.push(action.payload)
        state.loading = 'succeeded'

        // state.isSubCreateSnackBar = true
        // state.subNameForSnackBar = action.payload.name
      })
      .addCase(createSubscription.rejected, (state, action) => {
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
  clearAverageExpenses,
  addSubscription,
  deleteSubscription,
  editSubscription,
  updateUpcomingPayments,
  resetState,
} = subscriptionsSlice.actions
