import { useState } from "react";
import "../style/App.css";

interface Props {
  imgSrc: string;
  navItems: string[];
  setSection: (section: "Quiz" | "Create" | "About") => void;
}

const Navbar = ({ imgSrc, navItems, setSection }: Props) => {
  const [selectedSection, setSelectedSection] = useState(0);
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-black"
      style={{
        minHeight: "100px",
        boxShadow: "0 1rem 3rem rgba(255, 255, 255, 0.175)",
      }}
    >
      <div className="container-fluid bg-transparent">
        <a className="navbar-brand bg-transparent" href="#">
          <img
            src={imgSrc}
            width="60"
            height="60"
            className="d-inline-block align-center me-2"
            style={{ backgroundColor: "transparent" }}
            alt=""
          />
          <span
            className=" fw-bolder fs-4"
            style={{
              fontFamily: "'Verdana', sans-serif",
              backgroundColor: "transparent",
            }}
          >
            QuizMaker
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-transparent"></span>
        </button>
        <div
          className="collapse navbar-collapse align-items-start flex-column flex-md-row bg-transparent"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto bg-transparent">
            {navItems.map((item, index) => (
              <li
                key={item}
                className="nav-item active bg-transparent"
                onClick={() => {
                  setSelectedSection(index);
                  setSection(item as "Quiz" | "Create" | "About");
                }}
              >
                <a
                  className={
                    selectedSection == index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
