import { createDraftSafeSelector } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'

import classes from './SearchSubscription.module.css'

import cross from '../../assets/crossLight.png'
import searchIcon from '../../assets/searchIcon.png'
import { RootState, useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'

import { findSubscription, clearSearchAndSortFields } from '../store/subscriptions/subscriptionsSlice'

const SearchSubscription2 = () => {
  const dispatch = useAppDispatch()
  const inputSearch = useAppSelector(
    createDraftSafeSelector(
      (state: RootState) => state,
      (state) => state.subscriptions.inputSearch,
    ),
  )

  useEffect(
    () => () => {
      dispatch(clearSearchAndSortFields())
    },
    [dispatch],
  )

  return (
    <div className={classes.searchField}>
      <label htmlFor='search' className={classes.searchTitle}>
        FIND YOUR SUBSCRIPTION
      </label>
      <div className={classes.inputField}>
        <img src={searchIcon} alt='search' className={classes.searchIcon} />
        <input
          className={classes.input}
          type='text'
          name='search'
          id='search'
          placeholder='Netflix, Youtube, Spotify...etc'
          value={inputSearch}
          onChange={(ev) => dispatch(findSubscription({ inputSearch: ev.target.value }))}
        />
        <div
          role='button'
          tabIndex={0}
          onClick={() => dispatch(clearSearchAndSortFields())}
          onKeyDown={() => dispatch(clearSearchAndSortFields())}
        >
          <img src={cross} alt='cross' className={classes.crossIcon} />
        </div>
      </div>
    </div>
  )
}

export const SearchSubscription = React.memo(SearchSubscription2)
