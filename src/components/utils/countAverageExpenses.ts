import { TSubscription } from '../../types/subscription'

const countAverageExpensesByCurrency = (fetchedSubscriptions: Array<TSubscription>, currency: string) => {
  const averageExpenses = fetchedSubscriptions.reduce((sum, item) => {
    if (item.currency === currency) {
      return item.paymentFrequency === 'once a year' ? sum + item.price / 12 : sum + item.price
    }
    return sum
  }, 0)
  return averageExpenses !== 0 ? averageExpenses : null
}
export const countAverageExpenses = (fetchedSubscriptions: Array<TSubscription>) => {
  const averageExpensesRub = countAverageExpensesByCurrency(fetchedSubscriptions, 'RUB')

  const averageExpensesUsd = countAverageExpensesByCurrency(fetchedSubscriptions, 'USD')

  const averageExpensesEur = countAverageExpensesByCurrency(fetchedSubscriptions, 'EUR')
  return {
    averageExpensesRub,
    averageExpensesUsd,
    averageExpensesEur,
  }
}
