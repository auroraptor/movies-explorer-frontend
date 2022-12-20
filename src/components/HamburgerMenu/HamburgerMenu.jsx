import "./HamburgerMenu.css";

function HamburgerMenu({ click, handleMenu }) {
  return (
    <div className="hamburger hamburger_hidden">
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
    </div>
  );
}

export default HamburgerMenu;
