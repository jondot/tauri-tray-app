import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { persistor, store } from './store'

import App from './app'
import Actions from './actions'
import Form from './form'

import theme from './theme'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Form />,
      },
      {
        path: 'actions',
        element: <Actions />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>
)
