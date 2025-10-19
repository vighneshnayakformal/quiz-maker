import type { Question } from "./Question";

export type Quiz = {
  [title: string]: {
    description: string;
    questions: Question[];
  };
};
