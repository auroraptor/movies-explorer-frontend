import { Link } from "react-router-dom";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <Header className={"header header_place_main"}>
        <div className="header__navigation_page_main">
          <Link to="/signup" className="header__button header__button_color_transparent">
            Регистрация
          </Link>
          <Link to="/signin" className="header__button header__button_color_green">
            Войти
          </Link>
        </div>
      </Header>
      <Promo></Promo>
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
      <Footer></Footer>
    </div>
  );
}

export default Main;
