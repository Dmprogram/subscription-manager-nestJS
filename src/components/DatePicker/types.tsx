import { NewSubscriptionValues } from '../NewSubscription/types'
import { Subscription } from '../store/types'

export type DatePickProps = {
  setFieldValue: (first: string, second: { day: number; year: number; month: number } | null, third: boolean) => void
  values: Subscription | NewSubscriptionValues
}
