import { useState } from "react";
import Toast from "../../Toast";
import { PlayArrow, Edit, Close } from "@mui/icons-material";
import type { Quiz } from "../../Objects/Quiz";

interface Props {
  setQuizMode: (quizMode: "List" | "Edit" | "Play") => void;
  setCurrentQuiz: (currentQuiz: Quiz | null) => void;
}

const QuizList = ({ setQuizMode, setCurrentQuiz }: Props) => {
  const [quizList, setQuizList] = useState(
    JSON.parse(localStorage.getItem("quizzes")!)
  );

  const handleDelete = (t: Quiz) => {
    const updatedQuizList = {
      quizzes: quizList.quizzes.filter((q) => q !== t),
    };
    setQuizList(updatedQuizList);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizList));
  };

  return (
    <div>
      <div>
        <span>Your Quizzes</span>
        <div>
          {quizList.quizzes.map((t) => (
            <div key={Object.keys(t)[0]}>
              <hr />
              <span>{Object.keys(t)[0]}</span>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setCurrentQuiz(t);
                    setQuizMode("Play");
                  }}
                >
                  <PlayArrow />
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setCurrentQuiz(t);
                    setQuizMode("Edit");
                  }}
                >
                  <Edit />
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleDelete(t)}
                >
                  <Close />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default QuizList;
