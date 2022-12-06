import { useState } from "react";
import "./HamburgerMenu.css";

function HamburgerMenu() {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div
      className={
        click ? "hamburger__icon hamburger__icon__active" : "hamburger__icon"
      }
      onClick={handleClick}
    >
      <div
        className="hamburger__button hamburger__button_close"
        aria-label="Показать меню"
      />
    </div>
  );
}

export default HamburgerMenu;
