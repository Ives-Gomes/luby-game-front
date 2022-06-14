export interface Question {
  title: string;
  answers: Array<{
    question: string;
    response: boolean;
  }>;
}
