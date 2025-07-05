import CssBaseline from '@mui/material/CssBaseline'
// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'

// Cau hinh redux
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider defaultOptions={{
          confirmationText: "Yes",
          cancellationText: 'No',
          buttonOrder: ['confirm', 'cancel'],
          dialogProps: { maxWidth: 'xs' },
          allowClose: false,
          confirmationButtonProps: { color: 'error' },
          cancellationButtonProps: { color: 'inherit'}
        }}>
          <CssBaseline />
          <App />
          <ToastContainer position='bottom-left' theme='colored'/>
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)
