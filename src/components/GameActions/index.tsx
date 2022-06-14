import React, { useEffect } from 'react';

import { Button } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';
import { useGameActions } from '@hooks/gameActions';

import { Container } from './styles';

const GameActions: React.FC = () => {
  const {
    mintLBCHandler,
    startGameHandler,
    claimBalanceHandler,
    claimOwnerBalanceHandler,
  } = useGameActions();

  const { currentAccount, isOwner, getIsOwner } = useGameInfos();

  useEffect(() => {
    getIsOwner(currentAccount);
  }, [currentAccount]);

  return (
    <Container>
      {currentAccount && (
        <>
          <Button
            type="button"
            onClick={() => mintLBCHandler(currentAccount)}
            background="#fff"
            borderColor="#00e"
            color="blue"
          >
            Mint LBC
          </Button>

          <Button
            type="button"
            onClick={() => claimBalanceHandler(currentAccount)}
            background="#fff"
            borderColor="#00e"
            color="blue"
            style={{ marginLeft: 40 }}
          >
            Claim Balance
          </Button>

          {isOwner && (
            <Button
              type="button"
              onClick={() => claimOwnerBalanceHandler(currentAccount)}
              background="#fff"
              borderColor="#00e"
              color="blue"
              style={{ marginLeft: 40 }}
            >
              Claim All Balance
            </Button>
          )}

          <Button
            type="button"
            onClick={() => startGameHandler(currentAccount)}
            background="#fff"
            borderColor="#00e"
            color="blue"
            style={{ marginLeft: 40 }}
          >
            Start Game
          </Button>
        </>
      )}
    </Container>
  );
};

export default GameActions;
