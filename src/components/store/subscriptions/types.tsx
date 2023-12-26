import { TSubscription } from '../../../types/subscription'

export type TSubscriptionsState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: any
  inputSearch: string
  sortByParameter: null | string
  isOpenEditSnackBar: boolean
  isOpenDeleteSnackBar: boolean
  subNameForSnackBar: null | string
  subscriptions: TSubscription[]
}
