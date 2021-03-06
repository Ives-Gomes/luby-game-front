import React, { useEffect } from 'react';

import { Header, GameActions, Questions } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';

import { WarningContainer } from './styles';

const Home: React.FC = () => {
  const {
    walletConnected,
    walletIsInstalled,
  } = useGameInfos();

  useEffect(() => {
    walletIsInstalled();
  }, []);

  return (
    !walletConnected ? (
      <WarningContainer>
        <p>Please install the  Metamask to continue.</p>
      </WarningContainer>
    ) : (
      <>
        <Header />
        <GameActions />
        <Questions />
      </>
    )
  );
};

export default Home;
