import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import classes from './App.module.css'
import { MyFallbackComponent } from './components/ErrorBoundary/ErrorBoundary'
import { ActiveSubscriptionsPage } from './components/Pages/ActiveSubscriptionsPage'
import { EditSubscriptionPage } from './components/Pages/EditSubscriptionPage'
import { InactiveSubscriptionsPage } from './components/Pages/InactiveSubscriptionsPage'
import { MainPage } from './components/Pages/MainPage'
import { NewSubscriptionPage } from './components/Pages/NewSubscriptionPage'
import { NotFoundPage } from './components/Pages/NotFoundPage'
import { SignInPage } from './components/Pages/SignInPage'
import { SignUppage } from './components/Pages/SignUpPage'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
  <ErrorBoundary FallbackComponent={MyFallbackComponent}>
    <section className={classes.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignInPage />} />
          <Route path='/registration' element={<SignUppage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<MainPage />} />
            {/* <Route path='/active-subscriptions' element={<ActiveSubscriptionsPage />} />
            <Route path='/inactive-subscriptions' element={<InactiveSubscriptionsPage />} />
            <Route path='/new-subscription' element={<NewSubscriptionPage />} />
            <Route path='/edit-subscription/:subscriptionId' element={<EditSubscriptionPage />} /> */}
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  </ErrorBoundary>
)

export default App
