import { useState } from "react";
import type { Quiz } from "../../Objects/Quiz";
import type { Question } from "../../Objects/Question";

interface Props {
  setQuizMode: (quizMode: "List" | "Edit" | "Play") => void;
  currentQuiz: Quiz | null;
}

const QuizPlay = ({ setQuizMode, currentQuiz }: Props) => {
  const [shownAnswers, setShownAnswers] = useState<number[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const quizData = Object.values(currentQuiz!)[0];
  const [quizCopy, setQuizCopy] = useState<Question[]>([...quizData.questions]);

  const handleAnswer = () => {
    quizCopy.forEach((q, i) => {
      const qAnswerIndex = parseInt(q.answer) - 1;
      const qChoices = q.choices.split(",").map((c) => c.trim());
      const qAnswer = qChoices[qAnswerIndex];
      q.answer = qAnswer;
    });
  };

  const handleShuffle = (arr: any[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleRandomize = () => {
    quizCopy.forEach((q) => {
      let qChoices = q.choices.split(",").map((c) => c.trim());
      qChoices = handleShuffle(qChoices);
      q.choices = qChoices.join(",");
    });
    setQuizCopy(handleShuffle(quizCopy));
  };

  const handleNext = () => {
    if (currentQuestionNumber === 0) {
      handleAnswer();
      handleRandomize();
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    } else {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
  };
  const handlePrev = () => {
    setCurrentQuestionNumber(currentQuestionNumber - 1);
  };
  const handleShow = () => {
    if (!shownAnswers.includes(currentQuestionNumber - 1)) {
      setShownAnswers([...shownAnswers, currentQuestionNumber - 1]);
    }
  };
  const handleEnd = () => {
    setCurrentQuestionNumber(0);
    setShownAnswers([]);
    setQuizCopy([...quizData.questions]);
  };

  const introPage = () => (
    <div>
      <h1>{Object.keys(currentQuiz ?? {})[0]}</h1>
      <br />
      <h3>{Object.values(currentQuiz!)[0].description}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleNext()}
      >
        Start
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setQuizMode("List")}
      >
        Exit
      </button>
    </div>
  );

  const questionPage = () => (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span>Q{currentQuestionNumber}</span>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleEnd()}
          >
            End Quiz
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleShow()}
          >
            Show Answer
          </button>
        </div>
      </div>
      <div
        style={{
          padding: "1rem",
          borderRadius: "0.5rem",
          width: "100%",
          textAlign: "left",
          fontSize: "1.2rem",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          {quizCopy[currentQuestionNumber - 1].question}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          {quizCopy[currentQuestionNumber - 1] &&
            quizCopy[currentQuestionNumber - 1].choices
              .split(",")
              .map((c) => c.trim())
              .map((choice: string, i: number) => {
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor:
                        shownAnswers.includes(currentQuestionNumber - 1) &&
                        choice.trim() ===
                          quizCopy[currentQuestionNumber - 1].answer.trim()
                          ? "green"
                          : "#333333",
                      width: "47.5%",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {choice}
                  </div>
                );
              })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              currentQuestionNumber === 1 ||
              shownAnswers.includes(currentQuestionNumber - 1)
            }
            onClick={() => handlePrev()}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              currentQuestionNumber === quizCopy.length
                ? handleEnd()
                : handleNext()
            }
          >
            {currentQuestionNumber === quizCopy.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>{currentQuestionNumber === 0 ? introPage() : questionPage()}</div>
  );
};

export default QuizPlay;
