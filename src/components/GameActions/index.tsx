import React from 'react';

import { Button } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';
import { useGameActions } from '@hooks/gameActions';

import { Container } from './styles';

const GameActions: React.FC = () => {
  const {
    mintLBCHandler,
    startGameHandler,
  } = useGameActions();

  const { currentAccount } = useGameInfos();

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
