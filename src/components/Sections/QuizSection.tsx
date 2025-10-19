import { useState } from "react";
import AlertProvider from "../AlertProvider";
import QuizList from "./QuizSectionPages/QuizList";
import QuizEdit from "./QuizSectionPages/QuizEdit";
import QuizPlay from "./QuizSectionPages/QuizPlay";
import type { Quiz } from "../Objects/Quiz";

const QuizSection = () => {
  const [quizMode, setQuizMode] = useState<"List" | "Edit" | "Play">("List");
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const subsections = {
    List: (
      <QuizList setQuizMode={setQuizMode} setCurrentQuiz={setCurrentQuiz} />
    ),
    Edit: <QuizEdit setQuizMode={setQuizMode} currentQuiz={currentQuiz} />,
    Play: <QuizPlay setQuizMode={setQuizMode} currentQuiz={currentQuiz} />,
  };
  return <AlertProvider>{subsections[quizMode]}</AlertProvider>;
};

export default QuizSection;
