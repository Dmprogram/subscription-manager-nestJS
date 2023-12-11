import classes from './ErrorBoundary.module.css'

import error from '../../assets/error.png'

export const MyFallbackComponent = () => (
  <div className={classes.errorIndicator} role='alert'>
    <img src={error} alt='error icon' />
    <span>Something has gone wrong</span>
    <span>(but we fix it)</span>
  </div>
)
