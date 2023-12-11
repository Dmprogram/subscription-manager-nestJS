import * as Yup from 'yup'

const periods = ['once a month', 'once a year']

const twoDigisAfterComma = /^\d+(\.\d{0,2})?$/

const currencies = ['RUB', 'USD', 'EUR']
export const validationSubscriptionSchema = Yup.object({
  name: Yup.string().required('please enter a name'),
  price: Yup.number()
    .positive('price must be more than 0')
    .test('is-decimal', 'price should have maximum two digits after comma', (val) => {
      if (val !== undefined) {
        return twoDigisAfterComma.test(val.toString())
      }
      return true
    })
    .typeError('price must be a number')
    .required('please enter a price'),
  paymentFrequency: Yup.string().required('please select a period').oneOf(periods),
  currency: Yup.string().required('please select a currency').oneOf(currencies),
})

export const currenciesOptions = currencies.map((currency, key) => (
  // eslint-disable-next-line react/no-array-index-key
  <option value={currency} key={key}>
    {currency}
  </option>
))

export const paymentFrequencyOptions = periods.map((period, key) => (
  // eslint-disable-next-line react/no-array-index-key
  <option value={period} key={key}>
    {period}
  </option>
))
