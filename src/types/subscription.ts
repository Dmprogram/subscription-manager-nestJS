export type TSubscription = {
  id: number
  name: string
  currency: string
  price: number
  status: boolean
  day: number
  month: number
  year: number
  image?: string
  paymentFrequency: string
}

export type TCreateSubscription = Omit<TSubscription, 'id'>
export type TNewSubscriptionValues = Omit<TSubscription, 'id' | 'price' | 'year' | 'month' | 'day'> & {
  price: string
  date: null | {
    day: number
    month: number
    year: number
  }
}
