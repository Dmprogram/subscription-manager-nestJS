import classes from './UpcomingPayments.module.css'

import { useAppSelector } from '../../hooks/useReduxHooks'
import { TSubscription } from '../../types/subscription'

import { UpcomingPaymentsItem } from '../UpcomingPaymentsItem/UpcomingPaymentsItem'
import { UpcomingPaymentsSkeleton } from '../UpcomingPaymentsSkeleton/UpcomingPaymentsSkeleton'

export const UpcomingPayments = () => {
  const { upcomingPayments, loading } = useAppSelector((state) => state.subscriptionsList)

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
