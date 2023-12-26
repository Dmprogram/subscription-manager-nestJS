import { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { NavigationBar } from '../NavigationBar/NavigationBar'
import { NotificationDelete } from '../Notifications/NotificationDelete'
import { NotificationEdit } from '../Notifications/NotificationEdit'
import { fetchSubscriptions } from '../store/subscriptions/subscriptionsActions'

export const AppForAuthorized = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSubscriptions())
  }, [dispatch])
  return (
    <>
      <NavigationBar />
      <Outlet />
      <NotificationDelete />
      <NotificationEdit />
    </>
  )
}
