export interface Assessment {
  assessmentIdentifier: string;
  title: string;
  time: string;
  attempt: number;
  description: string;
  imageUrl: string;
  active: boolean;
  totalTaken: number;
  category: string;
}
