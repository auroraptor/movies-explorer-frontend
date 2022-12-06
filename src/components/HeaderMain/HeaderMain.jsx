import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./HeaderMain.css";

function HeaderMain() {
  return (
    <header className={"header"}>
      <Logo></Logo>
      <div className="header-main__control">
        <Link to="/signup" className="header-main__button header-main__button_transparent">Регистрация</Link>
        <Link to="/signin" className="header-main__button header-main__button_green">Войти</Link>
      </div>
    </header>
  );
}

export default HeaderMain;
