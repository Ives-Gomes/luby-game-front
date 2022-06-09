import React from 'react';

import { GameInfosProvider } from './gameInfos';

const AppProvider: React.FC = ({ children }: any) => (
  <GameInfosProvider>
    {children}
  </GameInfosProvider>
);

export default AppProvider;
