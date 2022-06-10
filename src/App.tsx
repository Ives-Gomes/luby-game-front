import React from 'react';
import { ToastContainer } from 'react-toastify';

import AppProvider from '@hooks/index';

import { Home } from '@pages/index';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <AppProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      style={{ marginTop: 35 }}
    />

    <Home />
  </AppProvider>
);

export default App;
