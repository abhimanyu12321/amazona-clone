import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux'
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AlertProvider>
  </Provider>


);

