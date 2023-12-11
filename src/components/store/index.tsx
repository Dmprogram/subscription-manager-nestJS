import { configureStore } from '@reduxjs/toolkit'

import subscriptionsListSlice from './subscriptionsListSlice'

export const store = configureStore({
  reducer: {
    subscriptionsList: subscriptionsListSlice,
  },
})
