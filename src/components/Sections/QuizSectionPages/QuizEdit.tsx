import type { Quiz } from "../../Objects/Quiz";
import { useContext, useState } from "react";
import { AlertContext } from "../../AlertProvider";
import type { Question } from "../../Objects/Question";
import Toast from "../../Toast";

interface Props {
  setQuizMode: (quizMode: "List" | "Edit" | "Play") => void;
  currentQuiz: Quiz | null;
}

const QuizEdit = ({ setQuizMode, currentQuiz }: Props) => {
  const { setAlert } = useContext(AlertContext);
  const [qData, setQData] = useState(currentQuiz);

  const qTitle = qData ? Object.keys(qData)[0] : "ERROR";
  const qQuestions = qData ? qData[qTitle].questions : [];

  const handleUpdateAfterRemove = (
    i: number,
    field: "description" | "question" | "choices" | "answer",
    value: string
  ) => {
    if (!qData) return;
    const title = Object.keys(qData)[0];
    setQData((q) => {
      const copy = { ...q };
      if (field === "description") {
        copy[title].description = value;
      } else {
        copy[title].questions[i] = {
          ...copy[title].questions[i],
          [field]: value,
        };
      }
      return copy;
    });
  };

  const handleAdd = () => {
    if (!qData) return;
    const title = Object.keys(qData)[0];
    const updatedQuestions = [
      ...qData[title].questions,
      { question: "", choices: "", answer: "" },
    ];
    setQData({
      ...qData,
      [title]: { ...qData[title], questions: updatedQuestions },
    });
  };

  const handleRemove = (i: number) => {
    if (!qData) return;
    const title = Object.keys(qData)[0];
    const questionsCopy = [...qData[title].questions];
    if (questionsCopy.length > 1) {
      questionsCopy.splice(i, 1);
      setQData({ [title]: { ...qData[title], questions: questionsCopy } });
    } else {
      setAlert({
        severity: "error",
        message: "Quiz must have at least 1 question.",
        show: true,
      });
    }
  };

  const validateQuestions = (questions: Question[]) => {
    const validationRecord: Record<number, number[]> = {};
    questions.forEach((q: Question, i: number) => {
      validationRecord[i] = [];
      if (q.question === "") {
        validationRecord[i].push(0);
      }
      if (
        q.choices
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c !== "").length != 4
      ) {
        validationRecord[i].push(1);
      }
      if (!["1", "2", "3", "4"].includes(q.answer)) {
        validationRecord[i].push(2);
      }
    });
    Object.keys(validationRecord).forEach((key) => {
      const typedkey = Number(key);
      if (
        Array.isArray(validationRecord[typedkey]) &&
        validationRecord[typedkey].length === 0
      ) {
        delete validationRecord[typedkey];
      }
    });
    return validationRecord;
  };

  const handleSave = () => {
    if (!qData) return;
    const title = Object.keys(qData)[0];
    const verdict = validateQuestions(qData[title].questions);
    if (Object.keys(verdict).length === 0) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes")!);
      const index = quizzes.quizzes.findIndex(
        (q: Quiz) => Object.keys(q)[0] === title
      );
      if (index !== -1) {
        quizzes.quizzes[index] = qData;
      }
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
      setAlert({ severity: "success", message: "Quiz updated!", show: true });
      setQData(null);
      setQuizMode("List");
    } else {
      const first_entry = Object.entries(verdict)[0];
      let message = `Question ${parseInt(first_entry[0]) + 1}: `;
      if (first_entry[1].includes(0)) {
        message += "Enter the question; ";
      }
      if (first_entry[1].includes(1)) {
        message += "Provide 4 choices separated by a comma; ";
      }
      if (first_entry[1].includes(2)) {
        message +=
          "Enter the position of the answer in your choices (Enter 1 if the 1st choice is the answer); ";
      }
      setAlert({
        severity: "error",
        message: message,
        show: true,
      });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{qTitle}</span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
      <br />
      <label htmlFor="qDescription">Description</label>
      <textarea
        id="qDescription"
        className="form-control"
        value={qData ? qData[qTitle].description : ""}
        rows={3}
        onChange={(e) =>
          handleUpdateAfterRemove(0, "description", e.target.value)
        }
      />
      <br />
      {qQuestions.map((q, i) => (
        <div key={i}>
          <hr />
          <label htmlFor={`question_${i + 1}`}>Question {i + 1}</label>
          <input
            type="text"
            value={q.question}
            className="form-control"
            id={`question_${i + 1}`}
            onChange={(e) =>
              handleUpdateAfterRemove(i, "question", e.target.value)
            }
          />
          <br />
          <label htmlFor={`choices_${i + 1}`}>Choices for Q{i + 1}</label>
          <input
            type="text"
            value={q.choices}
            className="form-control"
            id={`choices_${i + 1}`}
            onChange={(e) =>
              handleUpdateAfterRemove(i, "choices", e.target.value)
            }
          />
          <br />
          <label htmlFor={`answer_${i + 1}`}>Answer for Q{i + 1}</label>
          <input
            type="number"
            value={q.answer}
            className="form-control"
            id={`answer_${i + 1}`}
            onChange={(e) =>
              handleUpdateAfterRemove(i, "answer", e.target.value)
            }
          />
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleRemove(i)}
          >
            Remove
          </button>
          <Toast />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default QuizEdit;
