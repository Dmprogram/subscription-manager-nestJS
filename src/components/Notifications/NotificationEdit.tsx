import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import * as React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { changeIsOpenEditSnackBar } from '../store/subscriptions/subscriptionsSlice'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
))

export const NotificationEdit = () => {
  const { isOpenEditSnackBar, subNameForSnackBar } = useAppSelector((state) => state.subscriptions)
  const dispatch = useAppDispatch()
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(changeIsOpenEditSnackBar({ isOpenEditSnackBar: false }))
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpenEditSnackBar} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
          Subscription {subNameForSnackBar} has been edited!
        </Alert>
      </Snackbar>
    </Stack>
  )
}
