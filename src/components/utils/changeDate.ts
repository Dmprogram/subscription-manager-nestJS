import { Subscription } from '../store/types'

export const changeDate = (fetchedSubscriptions: Array<Subscription>) => {
  const timeNow = new Date().getTime()
  return fetchedSubscriptions.map((item) => {
    let { month } = item.date
    let { year } = item.date
    let subscriptionTime = new Date(`${item.date.year}-${item.date.month}-${item.date.day}`).getTime()
    while (subscriptionTime < timeNow) {
      if (month === 12) {
        month = 0
        year += 1
      }
      month += 1
      subscriptionTime = new Date(`${year}-${month}-${item.date.day}`).getTime()
    }
    return { ...item, date: { month, day: item.date.day, year } }
  })
}
