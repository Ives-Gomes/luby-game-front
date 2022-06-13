import { Question } from '@interfaces/questions/questionsInterfaces';

const questions: Array<Question> = [
  {
    title: 'Qual o ano de fundação da Luby?',
    answers: [
      {
        question: '1996',
        response: false,
      },
      {
        question: '2002',
        response: true,
      },
      {
        question: '2010',
        response: false,
      },
    ],
  },
  {
    title: 'Quantas pessoas incríveis trabalham hoje na Luby?',
    answers: [
      {
        question: 'Menos de 100 pessoas',
        response: false,
      },
      {
        question: '200 pessoas',
        response: false,
      },
      {
        question: 'Mais de 250 pessoas',
        response: true,
      },
    ],
  },
  {
    title: 'Como se chama o programa que acelera talentos da Luby?',
    answers: [
      {
        question: 'LabLuby',
        response: true,
      },
      {
        question: 'Acelera Luby',
        response: false,
      },
      {
        question: 'Talentos da Luby',
        response: false,
      },
    ],
  },
];

export default questions;
