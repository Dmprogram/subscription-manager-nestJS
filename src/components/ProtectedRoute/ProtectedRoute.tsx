import { Navigate, Outlet } from 'react-router-dom'

import classes from './ProtectedRoute.module.css'

import { useAuth } from '../../hooks/useAuth'
import { NavigationBar } from '../NavigationBar/NavigationBar'

import { Spinner } from '../Spinner/Spinner'

export const ProtectedRoute = () => {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return <Spinner />
  }
  return isAuth ? (
    <div className={classes.content}>
      <NavigationBar />
      <Outlet />
    </div>
  ) : (
    <Navigate replace to='/login' />
  )
}
