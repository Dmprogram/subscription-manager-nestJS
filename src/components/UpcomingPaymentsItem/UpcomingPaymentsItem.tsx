import { useState } from 'react'

import classes from './UpcomingPaymentsItem.module.css'

import applicationIcon from '../../assets/applicationIcon.png'
import calendar from '../../assets/calendar.png'
import money from '../../assets/money.png'
import { Subscription } from '../store/types'
import { formatDate } from '../utils/formatDate'
import { formatExpenses } from '../utils/formatExpenses'

export const UpcomingPaymentsItem = (props: Subscription) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false)

  const onLoad = () => {
    setIsLoadedImage(true)
  }

  const { date, name, price, currency, imageUrl } = props
  const { year, month, day } = date
  const { formatDay, formatMonth } = formatDate(year, month, day)
  return (
    <div className={classes.payment}>
      <div>
        <div className={classes.paymentTitle}>
          {imageUrl ? (
            <div className={classes.imageContainer}>
              {isLoadedImage ? null : <div className={classes.loader} />}
              <img
                src={imageUrl}
                alt='icon'
                className={classes.imageIcon}
                onLoad={onLoad}
                style={isLoadedImage ? {} : { display: 'none' }}
              />
            </div>
          ) : (
            <img src={applicationIcon} alt='icon' className={classes.applicationIcon} />
          )}
          <span>{name}</span>
        </div>
        <div className={classes.paymentDate}>
          <img src={calendar} alt='date' className={classes.dateIcon} />
          <span>
            Next payment - {formatDay} {formatMonth} {year}
          </span>
        </div>
      </div>
      <div className={classes.paymentValue}>
        <img src={money} alt='money' className={classes.moneyIcon} />
        {formatExpenses(price, currency)}
      </div>
    </div>
  )
}
