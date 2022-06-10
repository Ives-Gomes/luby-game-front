/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  mintLBC,
  startGame,
} from '@helpers/index';

interface GameActionsContextProps {
  startedGame: boolean;
  mintLBCHandler: (currentAccount: string) => void;
  startGameHandler: (currentAccount: string) => void;
  endGameHandler: () => void;
}

const GameActionsContext = createContext<GameActionsContextProps>({} as GameActionsContextProps);

const GameActionsProvider: React.FC = ({ children }: any) => {
  const [startedGame, setStartedGame] = useState(false);

  const mintLBCHandler = useCallback(async (currentAccount: string) => {
    await mintLBC(currentAccount) as any;
  }, [mintLBC]);

  const startGameHandler = useCallback(async (currentAccount: string) => {
    const response = await startGame(currentAccount) as any;

    if (response && response.transactionHash) {
      setStartedGame(true);
    }
  }, [startGame]);

  const endGameHandler = useCallback(async () => {
    setStartedGame(false);
  }, []);

  return (
    <GameActionsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        startedGame,
        mintLBCHandler,
        startGameHandler,
        endGameHandler,
      }}
    >
      {children}
    </GameActionsContext.Provider>
  );
};

const useGameActions = (): GameActionsContextProps => {
  const context = useContext(GameActionsContext);

  if (!context) {
    throw new Error('useGameActions must be used within an GameActionsProvider');
  }

  return context;
};

export { GameActionsProvider, useGameActions };
