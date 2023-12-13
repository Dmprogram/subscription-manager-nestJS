import CountUp from 'react-countup'
import { Link } from 'react-router-dom'

import classes from './AverageBoard.module.css'

import { useAppSelector } from '../../hooks/useReduxHooks'

export const AverageBoard = () => {
  const { averageExpensesRub, averageExpensesUsd, averageExpensesEur } = useAppSelector(
    (state) => state.subscriptionsList.averageExpenses,
  )
  return (
    <header className={classes.header}>
      <h2 className={classes.title}>AVERAGE MONTHLY EXPENSES</h2>
      <footer className={classes.footer}>
        <div className={classes.moneyContainer}>
          <div className={classes.money}>
            {averageExpensesRub && (
              <CountUp duration={2} separator=' ' decimals={2} decimal=',' end={averageExpensesRub} suffix=' ₽' />
            )}
          </div>
          <div className={classes.money}>
            {averageExpensesUsd && (
              <CountUp duration={2} separator=' ' decimals={2} decimal=',' end={averageExpensesUsd} suffix=' $' />
            )}
          </div>
          <div className={classes.money}>
            {averageExpensesEur && (
              <CountUp duration={2} separator=' ' decimals={2} decimal=',' end={averageExpensesEur} suffix=' €' />
            )}
          </div>
        </div>
        <Link to='/active-subscriptions' className={classes.link}>
          <span>ALL SUBSCRIPTIONS</span>
          <div className={classes.arrowRight} />
        </Link>
      </footer>
    </header>
  )
}
