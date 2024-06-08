import { useContext, useEffect } from 'react'
import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from './components/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  const routeElements = useRouterElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      <HelmetProvider>
        <ErrorBoundary>
          {routeElements}
          <ToastContainer />
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </HelmetProvider>
    </div>
  )
}

export default App
