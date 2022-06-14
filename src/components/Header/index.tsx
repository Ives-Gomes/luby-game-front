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
    gameBalance,
    getBalanceHandler,
    isOwner,
    contractBalance,
    getContractBalanceHandler,
  } = useGameInfos();

  const { startedGame, getBalance } = useGameActions();

  useEffect(() => {
    getPlayerBalanceHandler(currentAccount);
    getBalanceHandler(currentAccount);
    getContractBalanceHandler(currentAccount);
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
          <>
            <PlayerBalance>
              <p>{`Game balance: ${playerBalance}`}</p>
            </PlayerBalance>

            <PlayerBalance style={{ marginLeft: 20 }}>
              <p>{`Wallet balance: ${gameBalance}`}</p>
            </PlayerBalance>

            {isOwner && (
              <PlayerBalance style={{ marginLeft: 20 }}>
                <p>{`Contract balance: ${contractBalance}`}</p>
              </PlayerBalance>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Header;
