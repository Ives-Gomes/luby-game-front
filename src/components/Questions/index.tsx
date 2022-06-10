import React from 'react';

import { Button } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';
import { useGameActions } from '@hooks/gameActions';

import { Container } from './styles';

const Questions: React.FC = () => {
  const {
    correctAnswerHandler,
    incorrectAnswerHandler,
    startedGame,
  } = useGameActions();

  const { currentAccount } = useGameInfos();

  return (
    <Container>
      {currentAccount && startedGame && (
        <>
          <Button
            type="button"
            onClick={() => correctAnswerHandler(currentAccount)}
            background="#fff"
            borderColor="#00e"
            color="blue"
          >
            Correct
          </Button>

          <Button
            type="button"
            onClick={() => incorrectAnswerHandler(currentAccount)}
            background="#fff"
            borderColor="#00e"
            color="blue"
            style={{ marginLeft: 40 }}
          >
            Incorrect
          </Button>
        </>
      )}
    </Container>
  );
};

export default Questions;
