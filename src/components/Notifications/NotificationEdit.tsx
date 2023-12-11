import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import * as React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
))
interface NotificationEditProps {
  subscriptionEdit: boolean
  setSubscriptionEdit: (value: boolean) => void
}
export const NotificationEdit: React.FC<NotificationEditProps> = ({ subscriptionEdit, setSubscriptionEdit }) => {
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSubscriptionEdit(false)
  }
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={subscriptionEdit} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
          Subscription has been edited!
        </Alert>
      </Snackbar>
    </Stack>
  )
}
