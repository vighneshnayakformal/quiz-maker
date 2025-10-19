import { useState } from "react";
import CreateQuizDetails from "./CreateSectionPages/CreateQuizDetails";
import CreateQuizQuestions from "./CreateSectionPages/CreateQuizQuestions";
import AlertProvider from "../AlertProvider";

const CreateSection = () => {
  const [createMode, setCreateMode] = useState<1 | 2>(1);
  return (
    <AlertProvider>
      {createMode === 1 ? (
        <CreateQuizDetails setCreateMode={setCreateMode} />
      ) : (
        <CreateQuizQuestions setCreateMode={setCreateMode} />
      )}
    </AlertProvider>
  );
};

export default CreateSection;
