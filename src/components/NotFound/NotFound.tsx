import { Link } from 'react-router-dom'

import classes from './NotFound.module.css'

export const NotFound = () => (
  <h2 className={classes.notFound}>
    Sorry, but this page doesn&apos;t exist
    <Link to='/' className={classes.link}>
      <button type='button' className={classes.button}>
        Go to main
      </button>
    </Link>
  </h2>
)
