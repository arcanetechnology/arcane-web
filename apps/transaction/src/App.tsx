/** @format */

import * as React from 'react';
import Transaction from './components';
import { Provider } from 'react-redux';
import store from './state';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Provider store={store}>
      <Transaction />
      <ToastContainer />
    </Provider>
  );
}
