import { TSubscription } from '../../../types/subscription'

export type TSubscriptionsState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'pending-changeStatus' | 'pending-deleteSubscription'
  error: any
  inputSearch: string
  sortByParameter: null | string

  subscriptions: TSubscription[]
}
