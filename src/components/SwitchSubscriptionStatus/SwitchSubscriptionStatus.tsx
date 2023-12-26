import Stack from '@mui/joy/Stack/Stack'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import React, { useRef, useState } from 'react'

import classes from './SwitchSubscriptionStatus.module.css'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { changeSubscriptionStatus } from '../store/subscriptions/subscriptionsActions'

type SwitchSubscriptionStatusProps = {
  id: number
  status: boolean
}
export const SwitchSubscriptionStatus: React.FC<SwitchSubscriptionStatusProps> = ({ id, status }) => {
  const windowWidth = useRef(window.innerWidth)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [isStatus, setIsStatus] = useState(status)
  const [disabledStatus, setDisabledStatus] = useState(false)

  const handleChange = async () => {
    setIsStatus(!isStatus)
    setDisabledStatus(true)
    setLoading(true)
    try {
      await dispatch(changeSubscriptionStatus({ id: id.toString(), status: !status }))
      setLoading(false)
    } catch (e) {
      console.error('Error edit subscription: ', e)
    }
  }
  return (
    <FormGroup>
      <Stack direction='row' spacing={0} alignItems='center'>
        <div className={classes.container}>
          <div>
            {loading && !status ? (
              <div>
                <div className={classes.loader} />
              </div>
            ) : (
              !status && 'Inactive'
            )}
          </div>
          <Switch
            checked={isStatus}
            disabled={disabledStatus}
            onChange={handleChange}
            size={windowWidth.current < 568 ? 'small' : 'medium'}
          />
          <div>
            {loading && status ? (
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
