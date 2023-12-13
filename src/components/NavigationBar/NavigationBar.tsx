import { NavLink } from 'react-router-dom'

import classes from './NavigationBar.module.css'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { resetState } from '../store/subscriptionsSlice'
import { logout } from '../store/user/userActions'

export const NavigationBar = () => {
  const dispatch = useAppDispatch()

  return (
    <nav className={classes.container}>
      <NavLink to='/' className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}>
        <span>Main Page</span>
      </NavLink>
      <NavLink to='/active-subscriptions' className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}>
        <span>Active Subscriptions</span>
      </NavLink>
      <NavLink
        to='/inactive-subscriptions'
        className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
      >
        <span>Inactive Subscriptions</span>
      </NavLink>
      <NavLink to='/new-subscription' className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}>
        <span>Add subscription</span>
      </NavLink>

      <NavLink
        onClick={() => {
          dispatch(resetState())
          dispatch(logout())
        }}
        to='/login'
        className={classes.link}
      >
        <span>Sign out</span>
      </NavLink>
    </nav>
  )
}
