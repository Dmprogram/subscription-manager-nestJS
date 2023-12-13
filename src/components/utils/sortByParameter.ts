import { sortPaymentsToOldest } from './sortPaymentsToOldest'

import { TSubscription } from '../../types/subscription'

const currency = {
  RUB: 1,
  USD: 2,
  EUR: 3,
}

const sortPaymentsToNew = (fetchedSubscriptions: Array<TSubscription>) => {
  const sortedArr = [...fetchedSubscriptions].sort((a, b) => {
    const timeA = new Date(`${a.year}-${a.month}-${a.day}`).getTime()
    const timeB = new Date(`${b.year}-${b.month}-${b.day}`).getTime()
    const sortByPaymentsDate = timeB - timeA

    return sortByPaymentsDate
  })
  return sortedArr
}

const sortPaymentsToLow = (fetchedSubscriptions: Array<TSubscription>) =>
  [...fetchedSubscriptions].sort((a, b) => {
    const sortByCurrency = currency[a.currency as keyof typeof currency] - currency[b.currency as keyof typeof currency]
    if (sortByCurrency === 0 && !!a.currency && !!b.currency) {
      return b.price - a.price
    }
    return sortByCurrency
  })

const sortPaymentsToHigh = (fetchedSubscriptions: Array<TSubscription>) =>
  [...fetchedSubscriptions].sort((a, b) => {
    const sortByCurrency = currency[a.currency as keyof typeof currency] - currency[b.currency as keyof typeof currency]
    if (sortByCurrency === 0 && !!a.currency && !!b.currency) {
      return a.price - b.price
    }
    return sortByCurrency
  })

const sortPaymentsToZ = (fetchedSubscriptions: Array<TSubscription>) =>
  [...fetchedSubscriptions].sort((a, b) => (a.name > b.name ? 1 : -1))

const sortPaymentsToA = (fetchedSubscriptions: Array<TSubscription>) =>
  [...fetchedSubscriptions].sort((a, b) => (b.name > a.name ? 1 : -1))

export const sortByParameter = (fetchedSubscriptions: Array<TSubscription>, parameter: string | null) => {
  switch (parameter) {
    case 'dateToOld':
      return sortPaymentsToOldest(fetchedSubscriptions, fetchedSubscriptions.length)
    case 'dateToNew':
      return sortPaymentsToNew(fetchedSubscriptions)
    case 'priceToHigh':
      return sortPaymentsToHigh(fetchedSubscriptions)
    case 'priceToLow':
      return sortPaymentsToLow(fetchedSubscriptions)
    case 'alphabetToZ':
      return sortPaymentsToZ(fetchedSubscriptions)
    case 'alphabetToA':
      return sortPaymentsToA(fetchedSubscriptions)
    default:
      return fetchedSubscriptions
  }
}
