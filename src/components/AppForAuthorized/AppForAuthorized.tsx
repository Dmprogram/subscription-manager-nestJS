import { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { NavigationBar } from '../NavigationBar/NavigationBar'
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
    </>
  )
}
