// eslint-disable-next-line import/no-unresolved
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Link } from 'react-router-dom'

import classes from './ActiveSubscriptions.module.css'

import { useAppSelector } from '../../hooks/useReduxHooks'
import { TSubscription } from '../../types/subscription'
import { SelectSortType } from '../SelectSortType/SelectSortType'
import { SubscriptionItem } from '../SubscriptionItem/SubscriptionItem'
import { SubscriptionsSkeleton } from '../SubscriptionsSkeleton/SubscriptionsSkeleton'

export const ActiveSubscriptions = () => {
  const { subscriptions, loading, inputSearch } = useAppSelector((state) => state.subscriptions)
  const activeSubscriptions = subscriptions.filter((el) => el.status)

  const searchSubsciptions = subscriptions.filter((el) => el.name.toLowerCase().startsWith(inputSearch.toLowerCase()))

  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out',
    disrespectUserMotionPreference: false,
  })
  if (loading === 'pending')
    return (
      <section className={classes.payments}>
        <header className={classes.header}>
          <h3>ACTIVE SUBSCRIPTIONS</h3>
        </header>
        <div className={classes.paymentsTitle}>
          <Link to='/new-subscription' className={classes.link}>
            Add new subscription
          </Link>
        </div>
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
        <h3>{activeSubscriptions.length !== 0 ? 'ACTIVE SUBSCRIPTIONS' : 'THERE IS NO ACTIVE SUBSCRIPTION'}</h3>
      </header>
      <div className={classes.paymentsTitle}>
        <Link to='/new-subscription' className={classes.link}>
          Add new subscription
        </Link>
        {activeSubscriptions.length !== 0 ? (
          <div>
            <SelectSortType />
          </div>
        ) : null}
      </div>
      <div ref={parent}>
        {activeSubscriptions.map((subscription: TSubscription) => (
          <SubscriptionItem key={subscription.id} {...subscription} />
        ))}
      </div>
    </section>
  )
}
