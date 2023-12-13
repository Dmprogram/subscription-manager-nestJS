import { useEffect } from 'react'

import classes from './UpcomingPayments.module.css'

import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks'
import { TSubscription } from '../../types/subscription'
import { fetchSubscriptions } from '../store/subscriptions/subscriptionsActions'
import { updateUpcomingPayments } from '../store/subscriptions/subscriptionsSlice'

import { UpcomingPaymentsItem } from '../UpcomingPaymentsItem/UpcomingPaymentsItem'
import { UpcomingPaymentsSkeleton } from '../UpcomingPaymentsSkeleton/UpcomingPaymentsSkeleton'

export const UpcomingPayments = () => {
  const { upcomingPayments, loading, fetchedSubscriptions, activeSubscriptions } = useAppSelector(
    (state) => state.subscriptionsList,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (fetchedSubscriptions.length === 0) {
      dispatch(fetchSubscriptions())
    }
  }, [fetchedSubscriptions.length, dispatch])
  useEffect(() => {
    dispatch(updateUpcomingPayments())
  }, [activeSubscriptions.length, dispatch])
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
