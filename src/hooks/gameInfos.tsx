import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

import {
  metamaskInstalled,
  connectWallet,
  getPlayerBalance,
  getGameBalance,
} from '@helpers/index';

interface GameInfosContextProps {
  walletConnected: boolean;
  currentAccount: string;
  playerBalance: number;
  gameBalance: number;
  walletIsInstalled: () => Promise<void>;
  getCurrentAccount: () => Promise<void>;
  getPlayerBalanceHandler: () => Promise<void>;
  getGameBalanceHandler: () => Promise<void>;
}

const GameInfosContext = createContext<GameInfosContextProps>({} as GameInfosContextProps);

const GameInfosProvider: React.FC = ({ children }: any) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [playerBalance, setPlayerBalance] = useState(0);
  const [gameBalance, setGameBalance] = useState(0);

  const walletIsInstalled = useCallback(async () => {
    const isInstalled = metamaskInstalled();

    if (isInstalled) {
      setWalletConnected(true);
    }
  }, [metamaskInstalled]);

  const getCurrentAccount = useCallback(async () => {
    const account = await connectWallet() as any;

    setCurrentAccount(account);
  }, [connectWallet]);

  const getPlayerBalanceHandler = useCallback(async () => {
    const balance = await getPlayerBalance() as any;

    setPlayerBalance(balance);
  }, [getPlayerBalance]);

  const getGameBalanceHandler = useCallback(async () => {
    const balance = await getGameBalance() as any;

    setGameBalance(balance / 10 ** 18);
  }, [getPlayerBalance]);

  return (
    <GameInfosContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        walletConnected,
        currentAccount,
        playerBalance,
        gameBalance,
        walletIsInstalled,
        getCurrentAccount,
        getPlayerBalanceHandler,
        getGameBalanceHandler,
      }}
    >
      {children}
    </GameInfosContext.Provider>
  );
};

const useGameInfos = (): GameInfosContextProps => {
  const context = useContext(GameInfosContext);

  if (!context) {
    throw new Error('useGameInfos must be used within an GameInfosProvider');
  }

  return context;
};

export { GameInfosProvider, useGameInfos };
