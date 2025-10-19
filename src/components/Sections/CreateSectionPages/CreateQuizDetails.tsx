import { useContext, useState } from "react";
import { useRef } from "react";
import { AlertContext } from "../../AlertProvider";
import Toast from "../../Toast";

interface Props {
  setCreateMode: (createMode: 1 | 2) => void;
}

const CreateQuizDetails = ({ setCreateMode }: Props) => {
  const { setAlert } = useContext(AlertContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const questionsRef = useRef<HTMLInputElement>(null);
  const [empty, setEmpty] = useState<string>("");
  return (
    <div>
      <div>Create your Quiz! (1/2)</div>
      <br />
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="quiz-title">Title</label>
            <input
              type="text"
              className="form-control"
              id="quiz-title"
              placeholder="Enter title..."
              ref={titleRef}
              onChange={(e) => setEmpty(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quiz-description">Description</label>
            <textarea
              className="form-control"
              id="quiz-description"
              placeholder="Enter description..."
              rows={3}
              ref={descRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quiz-question-num">Number of Questions</label>
            <input
              type="number"
              min="1"
              step="1"
              className="form-control"
              id="quiz-question-num"
              placeholder="Enter number of questions..."
              ref={questionsRef}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={empty === ""}
            onClick={() => {
              const titleText = titleRef.current?.value;
              const descText = descRef.current?.value;
              let questionsInt = questionsRef.current?.value;
              const titles = JSON.parse(
                localStorage.getItem("quizzes")!
              ).quizzes.map((q) => Object.keys(q)[0]);
              if (titles.includes(titleText)) {
                setAlert({
                  severity: "error",
                  message: "Title is already used.",
                  show: true,
                });
              } else if (
                isNaN(parseInt(questionsInt ?? "")) ||
                parseInt(questionsInt ?? "") < 1
              ) {
                setAlert({
                  severity: "error",
                  message: "Enter a positive number.",
                  show: true,
                });
              } else {
                if (questionsInt === "") {
                  questionsInt = "1";
                }
                localStorage.setItem("tempTitle", titleText ?? "");
                localStorage.setItem("tempDesc", descText ?? "");
                localStorage.setItem("tempQuestionsNum", questionsInt ?? "1");
                setCreateMode(2);
              }
            }}
          >
            Next
          </button>
          <Toast />
        </form>
      </div>
    </div>
  );
};

export default CreateQuizDetails;
