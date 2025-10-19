import { useEffect, useState } from "react";
import "./style/App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  const tempInitStore = localStorage.getItem("quizzes");
  try {
    if (!tempInitStore) {
      throw new Error();
    }
    const parsed = JSON.parse(tempInitStore);
    if (!parsed.quizzes) {
      throw new Error();
    }
  } catch {
    localStorage.setItem("quizzes", JSON.stringify({ quizzes: [] }));
  }
  const items = ["Quiz", "Create", "About"];
  const [section, setSection] = useState<"Quiz" | "Create" | "About">("Quiz");

  useEffect(() => {
    document.title = "QuizMaker";
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "./assets/favicon.svg";
    document.head.appendChild(favicon);
  });

  return (
    <>
      <Header navItems={items} setSection={setSection} />
      <Content section={section} />
      <Footer />
    </>
  );
};

export default App;
