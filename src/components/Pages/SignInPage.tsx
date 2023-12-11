import { Link } from 'react-router-dom'

import classes from '../FormAuthorization/FormAuthorization.module.css'
import { SignIn } from '../SignIn/SignIn'

export const SignInPage = () => (
  <section className={classes.container}>
    <section className={classes.formContainer}>
      <h1 className={classes.header}>Sign In Subscription manager</h1>
      <div className={classes.description}>Quick & Simple way to monitor your subscriptions</div>
      <SignIn />
      <div className={classes.registration}>
        <span>Don&apos;t have an account? </span>
        <Link to='/registration' className={classes.link}>
          Create new account
        </Link>
      </div>
    </section>
  </section>
)
