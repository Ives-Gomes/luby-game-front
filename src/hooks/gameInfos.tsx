/* eslint-disable no-unused-vars */
import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

import {
  metamaskInstalled,
  connectWallet,
  getPlayerBalance,
} from '@helpers/index';

interface GameInfosContextProps {
  walletConnected: boolean;
  currentAccount: string;
  playerBalance: number;
  walletIsInstalled: () => Promise<void>;
  getCurrentAccount: () => Promise<void>;
  getPlayerBalanceHandler: (currAccount: string) => Promise<void>;
}

const GameInfosContext = createContext<GameInfosContextProps>({} as GameInfosContextProps);

const GameInfosProvider: React.FC = ({ children }: any) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [playerBalance, setPlayerBalance] = useState(0);

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

  const getPlayerBalanceHandler = useCallback(async (currAccount: string) => {
    const balance = await getPlayerBalance(currAccount) as any;

    setPlayerBalance(balance / 10 ** 18);
  }, [getPlayerBalance]);

  return (
    <GameInfosContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        walletConnected,
        currentAccount,
        playerBalance,
        walletIsInstalled,
        getCurrentAccount,
        getPlayerBalanceHandler,
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
