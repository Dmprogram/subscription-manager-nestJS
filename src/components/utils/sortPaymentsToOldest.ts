import { TSubscription } from '../../types/subscription'

export const sortPaymentsToOldest = (fetchedSubscriptions: Array<TSubscription>, amount: number) => {
  if (fetchedSubscriptions.length === 0) return fetchedSubscriptions
  const sortedArr = [...fetchedSubscriptions].sort((a, b) => {
    const timeA = new Date(`${a.year}-${a.month}-${a.day}`).getTime()
    const timeB = new Date(`${b.year}-${b.month}-${b.day}`).getTime()
    const sortByPaymentsDate = timeA - timeB

    return sortByPaymentsDate
  })

  sortedArr.length = amount
  return sortedArr
}
