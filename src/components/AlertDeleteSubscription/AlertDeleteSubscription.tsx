import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'

interface AlertDeleteSubscriptionProps {
  openAlert: boolean
  setOpenAlert: (value: boolean) => void
  setDeleteSubscription: (value: boolean) => void
}

export const AlertDeleteSubscription: React.FC<AlertDeleteSubscriptionProps> = ({
  openAlert,
  setOpenAlert,
  setDeleteSubscription,
}) => (
  <div>
    <Dialog open={openAlert} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <div style={{ backgroundColor: '#4f4e4e', color: 'white' }}>
        <DialogTitle id='alert-dialog-title'>Are you sure about deleting this subscription?</DialogTitle>
        <DialogActions>
          <Button
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: '#ad1f1f',
              },
            }}
            onClick={() => {
              setOpenAlert(false)
              setDeleteSubscription(true)
            }}
            autoFocus
          >
            Yes
          </Button>
          <Button
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: '#2737c6',
              },
            }}
            onClick={() => {
              setOpenAlert(false)
              setDeleteSubscription(false)
            }}
          >
            No
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  </div>
)
