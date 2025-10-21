import { useContext, useState } from "react";
import Delete from "@mui/icons-material/Delete";
import Toast from "../../Toast";
import { AlertContext } from "../../AlertProvider";
import type { Question } from "../../Objects/Question";
import type { Quiz } from "../../Objects/Quiz";

interface Props {
  setCreateMode: (createMode: 1 | 2) => void;
}

const CreateQuizQuestions = ({ setCreateMode }: Props) => {
  const qCount = parseInt(localStorage.getItem("tempQuestionsNum") ?? "1") ?? 1;

  const { setAlert } = useContext(AlertContext);
  const [bData, setBData] = useState(
    Array.from({ length: qCount }, () => ({
      question: "",
      choices: "",
      answer: "",
    }))
  );

  const handleUpdateAfterRemove = (
    i: number,
    field: "question" | "choices" | "answer",
    value: string
  ) => {
    setBData((b) => {
      const copy = [...b];
      copy[i] = { ...copy[i], [field]: value };
      return copy;
    });
  };

  const handleAdd = () => {
    setBData([
      ...bData,
      {
        question: "",
        choices: "",
        answer: "",
      },
    ]);
  };

  const handleDiscard = () => {
    localStorage.removeItem("tempTitle");
    localStorage.removeItem("tempDesc");
    localStorage.removeItem("tempQuestionsNum");
    setBData([]);
    setAlert({
      severity: "info",
      message: "Quiz discarded.",
      show: true,
    });
    setCreateMode(1);
  };

  const handleRemove = (i: number) => {
    if (bData.length > 1) {
      setBData((b) => b.filter((_, index: number) => index !== i));
    } else {
      handleDiscard();
    }
  };

  const validateBData = (bData: Question[]) => {
    const validationRecord: Record<number, number[]> = {};
    bData.forEach((q: Question, i: number) => {
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

  const handleSave = (bData: Question[]) => {
    const verdict = validateBData(bData);
    if (Object.keys(verdict).length === 0) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes")!);
      const title = localStorage.getItem("tempTitle")!;
      const desc = localStorage.getItem("tempDesc");
      const quiz = { [title]: { description: desc, questions: bData } };
      quizzes.quizzes.push(quiz);
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
      setAlert({
        severity: "success",
        message: "Quiz saved!",
        show: true,
      });
      setCreateMode(1);
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
        <span>Create your Quiz! (2/2)</span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            +
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleDiscard}
          >
            <Delete color="inherit" />
          </button>
        </div>
      </div>
      <br />
      {bData.map((q, i) => (
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
          onClick={() => handleSave(bData)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateQuizQuestions;
