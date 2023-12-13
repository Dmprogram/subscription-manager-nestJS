import Stack from '@mui/joy/Stack/Stack'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState, useRef } from 'react'

import classes from './SwitchSubscriptionStatus.module.css'

import { db, auth } from '../../firebase'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import { changeStatus } from '../store/subscriptionsSlice'

type SwitchSubscriptionStatusProps = {
  id: string
  status: boolean
}
export const SwitchSubscriptionStatus: React.FC<SwitchSubscriptionStatusProps> = ({ id, status }) => {
  const windowWidth = useRef(window.innerWidth)
  const dispatch = useAppDispatch()
  const [checked, setChecked] = useState(status)
  const [loading, setLoading] = useState(false)

  const handleChange = async () => {
    const user = auth.currentUser
    setChecked(!checked)
    setLoading(true)
    if (user) {
      try {
        await setDoc(
          doc(db, 'users', user.uid, 'subscriptions', id),
          {
            status: !status,
          },
          { merge: true },
        )
      } catch (e) {
        console.error('Error edit subscription: ', e)
      }
      dispatch(changeStatus({ status: !status, id }))
      setLoading(false)
    }
  }

  return (
    <FormGroup>
      <Stack direction='row' spacing={0} alignItems='center'>
        <div className={classes.container}>
          <div>{!loading && !checked && 'Inactive'}</div>
          <Switch checked={checked} onChange={handleChange} size={windowWidth.current < 568 ? 'small' : 'medium'} />
          <div>
            {loading ? (
              <div>
                <div className={classes.loader} />
              </div>
            ) : (
              checked && 'Active'
            )}
          </div>
        </div>
      </Stack>
    </FormGroup>
  )
}
