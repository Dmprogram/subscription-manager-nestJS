// eslint-disable-next-line import/no-unresolved
import { useAutoAnimate } from '@formkit/auto-animate/react'

import classes from './InactiveSubscriptions.module.css'

import { useAppSelector } from '../../hooks/useReduxHooks'
import { TSubscription } from '../../types/subscription'
import { SelectSortType } from '../SelectSortType/SelectSortType'
import { SubscriptionItem } from '../SubscriptionItem/SubscriptionItem'
import { SubscriptionsSkeleton } from '../SubscriptionsSkeleton/SubscriptionsSkeleton'

export const InactiveSubscriptions = () => {
  const { subscriptions, loading, inputSearch } = useAppSelector((state) => state.subscriptions)
  const inactiveSubscriptions = subscriptions.filter((el) => !el.status)

  const searchSubsciptions = subscriptions.filter((el) => el.name.toLowerCase().startsWith(inputSearch.toLowerCase()))

  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out',
    disrespectUserMotionPreference: false,
  })

  if (loading === 'pending')
    return (
      <section className={classes.payments}>
        <header className={classes.headerLoading}>
          <h3>DEACTIVATED SUBSCRIPTIONS</h3>
        </header>
        <SubscriptionsSkeleton />
      </section>
    )
  return inputSearch.length !== 0 ? (
    <section className={classes.payments}>
      <header className={classes.results}>
        <h3>SEARCH RESULTS</h3>
      </header>
      {searchSubsciptions.length > 0 ? (
        <div>
          {searchSubsciptions.map((subscription: TSubscription) => (
            <SubscriptionItem key={subscription.id} {...subscription} />
          ))}
        </div>
      ) : (
        <div className={classes.subscriptionNotFound}>There is no such subscription</div>
      )}
    </section>
  ) : (
    <section className={classes.payments}>
      <header className={classes.header}>
        <h3>
          {inactiveSubscriptions.length !== 0 ? 'DEACTIVATED SUBSCRIPTIONS' : 'THERE IS NO DEACTIVATED SUBSCRIPTION'}
        </h3>
      </header>
      <div className={classes.paymentsTitle}>
        {inactiveSubscriptions.length !== 0 ? (
          <div>
            <SelectSortType />
          </div>
        ) : null}
      </div>
      <div ref={parent}>
        {inactiveSubscriptions.map((subscription: TSubscription) => (
          <SubscriptionItem key={subscription.id} {...subscription} />
        ))}
      </div>
    </section>
  )
}
