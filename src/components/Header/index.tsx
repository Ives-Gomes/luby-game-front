import React, { useEffect } from 'react';

import { useGameInfos } from '../../hooks/gameInfos';

import {
  Account,
  GameBalance,
  Container,
  Content,
  PlayerBalance,
} from './styles';

const Header: React.FC = () => {
  const {
    getCurrentAccount,
    currentAccount,
    getPlayerBalanceHandler,
    getGameBalanceHandler,
    playerBalance,
    gameBalance,
  } = useGameInfos();

  useEffect(() => {
    getPlayerBalanceHandler();
    getGameBalanceHandler();
  }, [playerBalance]);

  return (
    <Container>
      <Content>
        <button type="button" onClick={getCurrentAccount}>Connect Account</button>

        {currentAccount.length === 0 ? (
          <Account>Connect your account in Metamask.</Account>
        ) : (
          <Account>{currentAccount}</Account>
        )}
      </Content>

      <Content>
        <PlayerBalance>
          <p>{`Your points: ${playerBalance}`}</p>
        </PlayerBalance>

        <GameBalance>{`Game balance: ${gameBalance}`}</GameBalance>
      </Content>
    </Container>
  );
};

export default Header;
