
export enum Difficulty {
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface Question {
  id: string;
  topicId: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  codeSnippet?: string;
  language?: string;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface ProgressData {
  completedQuestionIds: string[];
}

export interface UserProgress {
  [topicId: string]: {
    [level in Difficulty]: ProgressData;
  };
}

export interface SearchResult {
  question: Question;
  topicName: string;
}
