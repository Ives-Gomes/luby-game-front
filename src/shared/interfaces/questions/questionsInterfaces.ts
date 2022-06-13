export interface Question {
  title: string;
  answers: [
    {
      question: string;
      response: boolean;
    },
    {
      question: string;
      response: boolean;
    },
    {
      question: string;
      response: boolean;
    }
  ]
}
