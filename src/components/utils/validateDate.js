import dayjs from 'dayjs'

const today = dayjs()
export const todayStartOfTheDay = today.startOf('day')
export const maxDate = dayjs().add(366, 'day')

export const validateDate = (dayJs) => {
  if (maxDate - dayJs >= 0 && dayJs - todayStartOfTheDay >= 0) {
    return {
      day: dayJs.$D,
      month: dayJs.$M + 1,
      year: dayJs.$y,
    }
  }
  return null
}
