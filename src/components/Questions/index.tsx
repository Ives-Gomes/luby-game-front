import React, { useEffect, useState } from 'react';

import { Button } from '@components/index';

import { useGameInfos } from '@hooks/gameInfos';
import { useGameActions } from '@hooks/gameActions';

import questions from '@shared/helpers/questions';

import {
  Container,
  Question,
  Answers,
  QuestionTitle,
} from './styles';

const Questions: React.FC = () => {
  const {
    correctAnswerHandler,
    incorrectAnswerHandler,
    startedGame,
  } = useGameActions();

  const { currentAccount } = useGameInfos();

  const [randomNumber, setRandomNumber] = useState<number>();

  useEffect(() => {
    const random = Math.floor(Math.random() * 3);

    setRandomNumber(random);
  }, []);

  const answerQuestion = (questionResponse: boolean) => {
    if (questionResponse) {
      correctAnswerHandler(currentAccount);

      return;
    }

    incorrectAnswerHandler(currentAccount);
  };

  return (
    <Container>
      {currentAccount && startedGame && (
        <Question>
          <QuestionTitle>
            {questions[randomNumber as number].title}
          </QuestionTitle>

          <Answers>
            {questions[randomNumber as number].answers.map((answer) => (
              <Button
                type="button"
                key={answer.question}
                onClick={() => answerQuestion(answer.response)}
                background="#fff"
                borderColor="#00e"
                color="blue"
                style={{ marginRight: 20 }}
              >
                {answer.question}
              </Button>
            ))}
          </Answers>
        </Question>
      )}
    </Container>
  );
};

export default Questions;
