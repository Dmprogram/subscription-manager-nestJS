export const formatExpenses = (expenses: number, currency: string) =>
  expenses.toLocaleString('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
