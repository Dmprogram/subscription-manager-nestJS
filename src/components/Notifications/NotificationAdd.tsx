import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import * as React from 'react'
import { Link } from 'react-router-dom'

import classes from './NotificationAdd.module.css'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
))

interface NotificationAddProps {
  subscriptionAdded: boolean
  setSubscriptionAdded: (value: boolean) => void
}

export const NotificationAdd: React.FC<NotificationAddProps> = ({ subscriptionAdded, setSubscriptionAdded }) => {
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSubscriptionAdded(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={subscriptionAdded} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Subscription has been created!
          <Link to='/active-subscriptions' className={classes.link}>
            Go to Subscriptions
          </Link>
        </Alert>
      </Snackbar>
    </Stack>
  )
}
