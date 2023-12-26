import Stack from '@mui/joy/Stack/Stack'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import React, { useRef } from 'react'

import classes from './SwitchSubscriptionStatus.module.css'

import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { changeSubscriptionStatus } from '../store/subscriptions/subscriptionsActions'

type SwitchSubscriptionStatusProps = {
  id: number
  status: boolean
}
export const SwitchSubscriptionStatus: React.FC<SwitchSubscriptionStatusProps> = ({ id, status }) => {
  const windowWidth = useRef(window.innerWidth)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.subscriptions)

  const handleChange = async () => {
    try {
      dispatch(changeSubscriptionStatus({ id: id.toString(), status: !status }))
    } catch (e) {
      console.error('Error edit subscription: ', e)
    }
  }

  return (
    <FormGroup>
      <Stack direction='row' spacing={0} alignItems='center'>
        <div className={classes.container}>
          <div>{!status && 'Inactive'}</div>
          <Switch checked={status} onChange={handleChange} size={windowWidth.current < 568 ? 'small' : 'medium'} />
          <div>
            {loading === 'pending-changeStatus' ? (
              <div>
                <div className={classes.loader} />
              </div>
            ) : (
              status && 'Active'
            )}
          </div>
        </div>
      </Stack>
    </FormGroup>
  )
}
