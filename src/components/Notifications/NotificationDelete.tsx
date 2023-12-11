import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import * as React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
))

interface NotificationDeleteProps {
  subscriptionDelete: boolean
  setSubscriptionDelete: (value: boolean) => void
}

export const NotificationDelete: React.FC<NotificationDeleteProps> = ({
  subscriptionDelete,
  setSubscriptionDelete,
}) => {
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSubscriptionDelete(false)
  }
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={subscriptionDelete} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Subscription has been deleted!
        </Alert>
      </Snackbar>
    </Stack>
  )
}
