/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './state';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { worker } from './mocks/browser';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

const render = async () => {
  if (import.meta.env.DEV) {
    await worker.start();
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <PersistGate loading={'loading..'} persistor={persistStore(store)}>
        <App />
        <ToastContainer
          position="top-center"
          pauseOnFocusLoss
          pauseOnHover
          draggable
          newestOnTop={false}
          autoClose={5000}
          hideProgressBar
        />
      </PersistGate>
    </Provider>,
  );
};

render();
