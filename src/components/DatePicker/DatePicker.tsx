import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateValidationError } from '@mui/x-date-pickers/models'
import dayjs from 'dayjs'
import React, { useState, useMemo } from 'react'

import 'dayjs/locale/en-gb'
import classes from './DatePicker.module.css'

import { TDatePick } from './types'

import { todayStartOfTheDay, maxDate, validateDate } from '../../utils/validateDate'

export const DatePick: React.FC<TDatePick> = ({ setFieldValue, year, month, day }) => {
  const [error, setError] = useState<DateValidationError | null>(null)
  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date from today to one year'
      }

      case 'invalidDate': {
        return 'Your date is not valid'
      }

      default: {
        return <div className={classes.clue}>Please select a date from today to one year</div>
      }
    }
  }, [error])
  return (
    <div className={classes.container}>
      <div className={classes.pickerContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
          <DatePicker
            className={classes.picker}
            onError={(newError) => setError(newError)}
            formatDensity='spacious'
            value={year && month && day ? dayjs(`${year}-${month}-${day}`) : null}
            onChange={(value) => {
              const date = validateDate(value)
              if (date !== null) {
                const { year, month, day } = date
                setFieldValue('year', year, true)
                setFieldValue('month', month, true)
                setFieldValue('day', day, true)
              }
            }}
            orientation='portrait'
            slotProps={{
              textField: {
                size: 'small',
                id: 'datePicker',
              },
            }}
            minDate={todayStartOfTheDay}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </div>
      <div className={classes.error}>{errorMessage}</div>
    </div>
  )
}
