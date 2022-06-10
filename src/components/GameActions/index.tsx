import React from 'react';

import { Button } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';
import { useGameActions } from '@hooks/gameActions';

import { Container } from './styles';

const GameActions: React.FC = () => {
  const {
    mintLBCHandler,
    startGameHandler,
    claimBalanceHandler,
  } = useGameActions();

  const { currentAccount, playerBalance } = useGameInfos();

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
            onClick={() => claimBalanceHandler(currentAccount, playerBalance.toString())}
            background="#fff"
            borderColor="#00e"
            color="blue"
            style={{ marginLeft: 40 }}
          >
            Claim Balance
          </Button>

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
