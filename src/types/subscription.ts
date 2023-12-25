export type TSubscription = {
  id: number
  name: string
  currency: string
  price: number
  status: boolean
  day: number
  month: number
  year: number
  image: string | null
  paymentFrequency: string
}

export type TSubscriptionCreateValues = Omit<TSubscription, 'id'>

export type TSubscriptionCreateFormValues = Omit<TSubscriptionCreateValues, 'price' | 'day' | 'month' | 'year'> & {
  price: string
  year: number | null
  month: number | null
  day: number | null
}

export type TSubscriptionEditFormValues = Omit<TSubscription, 'price'> & {
  price: string | number
}
\
