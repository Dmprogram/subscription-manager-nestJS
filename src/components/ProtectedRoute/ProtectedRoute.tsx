import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import classes from './ProtectedRoute.module.css'

import { auth } from '../../firebase'
import { NavigationBar } from '../NavigationBar/NavigationBar'

import { Spinner } from '../Spinner/Spinner'

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true)
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true)
      if (user) {
        setAuthState(true)
        setLoading(false)
      } else {
        setAuthState(false)
        setLoading(false)
      }
    })
    return () => {
      subscribe()
    }
  }, [])

  if (loading) {
    return <Spinner />
  }
  return authState ? (
    <div className={classes.content}>
      <NavigationBar />
      <Outlet />
    </div>
  ) : (
    <Navigate replace to='/login' />
  )
}
