import { configureStore } from '@reduxjs/toolkit'

import { subscriptionsSlice } from './subscriptions/subscriptionsSlice'
import { userSlice } from './user/userSlice'

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionsSlice.reducer,
    user: userSlice.reducer,
  },
})
