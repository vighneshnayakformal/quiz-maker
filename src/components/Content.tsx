import { QuizSection, CreateSection, AboutSection } from "./Sections";

interface Props {
  section: "Quiz" | "Create" | "About";
}

const Content = ({ section }: Props) => {
  switch (section) {
    case "Create":
      return <CreateSection />;
    case "About":
      return <AboutSection />;
    case "Quiz":
      return <QuizSection />;
    default:
      return <QuizSection />;
  }
};

export default Content;
