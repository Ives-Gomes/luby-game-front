import React, { useEffect } from 'react';

import { Button } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';
import { useGameActions } from '@hooks/gameActions';

import {
  Account,
  Container,
  Content,
  PlayerBalance,
} from './styles';

const Header: React.FC = () => {
  const {
    getCurrentAccount,
    currentAccount,
    getPlayerBalanceHandler,
    playerBalance,
    getIsOwner,
    isOwner,
  } = useGameInfos();

  useEffect(() => {
    getIsOwner(currentAccount);
  }, [currentAccount]);

  const { startedGame, getBalance } = useGameActions();

  useEffect(() => {
    getPlayerBalanceHandler(currentAccount);
  }, [startedGame, currentAccount, getBalance]);

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
          <PlayerBalance>
            <p>{`Your balance: ${playerBalance}`}</p>
          </PlayerBalance>
        )}

        {isOwner && (
          <p>IS OWNER</p>
        )}
      </Content>
    </Container>
  );
};

export default Header;
