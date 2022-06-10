import React, { useEffect } from 'react';

import { Button } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';
import { useGameActions } from '@hooks/gameActions';

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

  const { startedGame } = useGameActions();

  useEffect(() => {
    getPlayerBalanceHandler();
    getGameBalanceHandler();
  }, [startedGame]);

  return (
    <Container>
      <Content>
        <Button
          type="button"
          onClick={getCurrentAccount}
          background="#fff"
          borderColor="#fff"
          color="blue"
        >
          Connect Account
        </Button>

        {currentAccount.length === 0 ? (
          <Account>Connect your account in Metamask.</Account>
        ) : (
          <Account>{currentAccount}</Account>
        )}
      </Content>

      <Content>
        {currentAccount.length !== 0 && (
          <>
            <PlayerBalance>
              <p>{`Your points: ${playerBalance}`}</p>
            </PlayerBalance>

            <GameBalance>{`Game balance: ${gameBalance}`}</GameBalance>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Header;
