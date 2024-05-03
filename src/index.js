import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { reduxStore, persistor } from './redux';
import App from './App';
import theme from './theme';
import 'simplebar-react/dist/simplebar.min.css';

import { BrowserRouter } from 'react-router-dom';
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
const queryClient = new QueryClient({});

root.render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
