import Navbar from "./Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface Props {
  navItems: string[];
  setSection: (section: "Quiz" | "Create" | "About") => void;
}

const Header = ({ navItems, setSection }: Props) => {
  return (
    <header id="header">
      <Navbar
        imgSrc="./assets/favicon.svg"
        navItems={navItems}
        setSection={setSection}
      />
    </header>
  );
};

export default Header;
