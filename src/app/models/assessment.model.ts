import { Category } from './category.model';
import { Question } from './question.model';

export interface Assessment {
  id: number;
  assessmentIdentifier: string;
  title: string;
  time: string;
  attempt: number;
  description: string;
  imageUrl: string;
  active: boolean;
  totalTaken: number;
  category: Category;
  questions: Question[];
}
