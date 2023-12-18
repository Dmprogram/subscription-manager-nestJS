import { Navigate } from 'react-router-dom'

import classes from './ProtectedRoute.module.css'

import { useAuth } from '../../hooks/useAuth'
import { AppForAuthorized } from '../AppForAuthorized/AppForAuthorized'

import { Spinner } from '../Spinner/Spinner'

export const ProtectedRoute = () => {
  const { isAuth, isLoading } = useAuth()
  if (isLoading === 'pending') {
    return <Spinner />
  }

  if (isAuth && isLoading === 'succeeded') {
    return (
      <div className={classes.content}>
        <AppForAuthorized />
      </div>
    )
  }

  if (!isAuth || isLoading === 'failed') {
    return <Navigate replace to='/login' />
  }
}
