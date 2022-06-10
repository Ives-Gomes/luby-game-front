import React from 'react';

import { GameInfosProvider } from './gameInfos';
import { GameActionsProvider } from './gameActions';

const AppProvider: React.FC = ({ children }: any) => (
  <GameInfosProvider>
    <GameActionsProvider>
      {children}
    </GameActionsProvider>
  </GameInfosProvider>
);

export default AppProvider;
