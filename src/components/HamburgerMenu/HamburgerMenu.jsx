import Navigation from "../Navigation/Navigation";
import "./HamburgerMenu.css";

function HamburgerMenu({ click, handleMenu }) {
  return (
    <div className="hamburger">
    <div
      className={
        click ? "hamburger__icon hamburger__icon_active" : "hamburger__icon"
      }
      onClick={handleMenu}
    >
      <div
        className="hamburger__button hamburger__button_close"
        aria-label="Показать меню"
      />
    </div>
    <Navigation className={click ? "menu menu_active" : "menu"} handleMenu={handleMenu}/>
    </div>
  );
}

export default HamburgerMenu;
