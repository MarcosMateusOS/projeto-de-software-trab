import { IQuestions } from './questions.interface';

export class QuizCreateDto {
  title: string;
  subject: string;
  questions: IQuestions[];
}
