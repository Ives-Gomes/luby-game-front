import React from 'react';

import AppProvider from './hooks';

import { Home } from './pages/index';

const App: React.FC = () => (
  <AppProvider>
    <Home />
  </AppProvider>
);

export default App;
