import dayjs, { Dayjs } from 'dayjs'

const today = dayjs()
export const todayStartOfTheDay = today.startOf('day')
export const maxDate = dayjs().add(366, 'day')

export const validateDate = (dayJs: Dayjs | null) => {
  if (
    dayJs &&
    maxDate.get('millisecond') - dayJs.get('millisecond') >= 0 &&
    dayJs.get('millisecond') - todayStartOfTheDay.get('millisecond') >= 0
  ) {
    return {
      day: dayJs.get('D'),
      month: dayJs.get('M') + 1,
      year: dayJs.get('y'),
    }
  }
  return null
}
