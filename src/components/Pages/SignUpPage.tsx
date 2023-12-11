import classes from '../FormAuthorization/FormAuthorization.module.css'
import { SignUp } from '../SignUp/SignUp'

export const SignUppage = () => (
  <section className={classes.container}>
    <section className={classes.formContainer}>
      <h1 className={classes.header}>Sign Up Subscription manager</h1>
      <div className={classes.description}>Quick & Simple way to monitor your subscriptions</div>
      <SignUp />
    </section>
  </section>
)
