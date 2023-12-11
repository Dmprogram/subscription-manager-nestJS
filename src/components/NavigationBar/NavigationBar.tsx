import { signOut } from 'firebase/auth'
import { NavLink } from 'react-router-dom'

import classes from './NavigationBar.module.css'

import { auth } from '../../firebase'
import { useAppDispatch } from '../../hooks/ReduxHooks'
import { resetState } from '../store/subscriptionsListSlice'

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

          signOut(auth).catch((error) => {
            console.log(error)
          })
        }}
        to='/login'
        className={classes.link}
      >
        <span>Sign out</span>
      </NavLink>
    </nav>
  )
}
