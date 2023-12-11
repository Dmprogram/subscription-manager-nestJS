export type EditValues = {
  name: string
  price: number | string
  currency: string
  paymentFrequency: string
  date: {
    day: number
    month: number
    year: number
  }
  status: boolean
  id: string
  imageUrl: string | null
}
