import classes from './UpcomingPayments.module.css'

import { useAppSelector } from '../../hooks/useReduxHooks'
import { TSubscription } from '../../types/subscription'

import { sortPaymentsToOldest } from '../../utils/sortPaymentsToOldest'
import { UpcomingPaymentsItem } from '../UpcomingPaymentsItem/UpcomingPaymentsItem'
import { UpcomingPaymentsSkeleton } from '../UpcomingPaymentsSkeleton/UpcomingPaymentsSkeleton'

export const UpcomingPayments = () => {
  const { subscriptions, loading } = useAppSelector((state) => state.subscriptions)
  const upcomingPayments = sortPaymentsToOldest(
    subscriptions.filter((el) => el.status),
    3,
  )
  if (loading === 'pending')
    return (
      <section className={classes.payments}>
        <h3 className={classes.paymentsTitle}>UPCOMING PAYMENTS</h3>
        <UpcomingPaymentsSkeleton />
      </section>
    )
  return (
    <section className={classes.payments}>
      <h3 className={classes.paymentsTitle}>
        {upcomingPayments.length !== 0 ? 'UPCOMING PAYMENTS' : 'THERE IS NO UPCOMING PAYMENT'}
      </h3>
      {upcomingPayments.map((subscription: TSubscription) => (
        <UpcomingPaymentsItem key={subscription.id} {...subscription} />
      ))}
    </section>
  )
}
