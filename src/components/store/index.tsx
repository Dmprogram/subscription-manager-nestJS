import { configureStore } from '@reduxjs/toolkit'

import subscriptionsListSlice from './subscriptionsSlice'
import { userSlice } from './user/userSlice'

export const store = configureStore({
  reducer: {
    subscriptionsList: subscriptionsListSlice,
    user: userSlice.reducer,
  },
})
