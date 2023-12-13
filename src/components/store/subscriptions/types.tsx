import { TSubscription } from '../../../types/subscription'

export type TSubscriptionsState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: any
  inputSearch: string
  sortByParameter: null | string
  fetchedSubscriptions: Array<TSubscription>

  searchSubsciptions: Array<TSubscription>
  activeSubscriptions: Array<TSubscription>
  inactiveSubscriptions: Array<TSubscription>

  upcomingPayments: Array<TSubscription>
  averageExpenses: {
    averageExpensesRub: null | number
    averageExpensesUsd: null | number
    averageExpensesEur: null | number
  }
}
