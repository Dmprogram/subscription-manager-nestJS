import { bindActionCreators } from '@reduxjs/toolkit'

import { useMemo } from 'react'

import { useAppDispatch } from './useReduxHooks'

import { rootActions } from '../components/store/rootActions'

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
