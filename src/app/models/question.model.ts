import { Assessment } from './assessment.model';

export interface Question {
  id: number;
  questionIdentifier: string;
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  mark: number;
  imageUrl: string;
  questionAnswer: string;
  assessment: Assessment;
}
