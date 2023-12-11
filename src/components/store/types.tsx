import { store } from './index'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface Subscription {
  name: string
  price: number
  currency: string
  paymentFrequency: string
  id: string
  date: {
    day: number
    month: number
    year: number
  }
  status: boolean
  imageUrl: string | null
  creationTime: number
}

export interface SubscriptionsState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: any
  inputSearch: string
  sortByParameter: null | string
  fetchedSubscriptions: Array<Subscription>

  searchSubsciptions: Array<Subscription>
  activeSubscriptions: Array<Subscription>
  inactiveSubscriptions: Array<Subscription>

  upcomingPayments: Array<Subscription>
  averageExpenses: {
    averageExpensesRub: null | number
    averageExpensesUsd: null | number
    averageExpensesEur: null | number
  }
}
