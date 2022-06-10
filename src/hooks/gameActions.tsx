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
  correctAnswer,
  incorrectAnswer,
  claimBalance,
} from '@helpers/index';

interface GameActionsContextProps {
  startedGame: boolean;
  getBalance: boolean;
  mintLBCHandler: (currentAccount: string) => void;
  startGameHandler: (currentAccount: string) => void;
  correctAnswerHandler: (currentAccount: string) => void;
  incorrectAnswerHandler: (currentAccount: string) => void;
  claimBalanceHandler: (currentAccount: string, amount: string) => void;
}

const GameActionsContext = createContext<GameActionsContextProps>({} as GameActionsContextProps);

const GameActionsProvider: React.FC = ({ children }: any) => {
  const [startedGame, setStartedGame] = useState(false);
  const [getBalance, setGetBalance] = useState(false);

  const mintLBCHandler = useCallback(async (currentAccount: string) => {
    await mintLBC(currentAccount) as any;

    setGetBalance(!getBalance);
  }, [mintLBC]);

  const startGameHandler = useCallback(async (currentAccount: string) => {
    const response = await startGame(currentAccount) as any;

    if (response && response.transactionHash) {
      setStartedGame(true);
    }
  }, [startGame]);

  const correctAnswerHandler = useCallback(async (currentAccount: string) => {
    const response = await correctAnswer(currentAccount) as any;

    if (response && response.transactionHash) {
      setStartedGame(false);
    }
  }, [correctAnswer]);

  const incorrectAnswerHandler = useCallback(async (currentAccount: string) => {
    const response = await incorrectAnswer(currentAccount) as any;

    if (response && response.transactionHash) {
      setStartedGame(false);
    }
  }, [correctAnswer]);

  const claimBalanceHandler = useCallback(async (currentAccount: string, amount: string) => {
    await claimBalance(currentAccount, amount) as any;

    setGetBalance(!getBalance);
  }, [correctAnswer]);

  return (
    <GameActionsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        startedGame,
        getBalance,
        mintLBCHandler,
        startGameHandler,
        correctAnswerHandler,
        incorrectAnswerHandler,
        claimBalanceHandler,
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
