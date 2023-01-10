import { Link } from "react-router-dom";
import { useContext } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Footer from "../Footer/Footer";
import "./Main.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {
  const { isClickMenu, handleMenu } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      {currentUser.name.length > 0 ? (
        <Header className={"header header_place_main"}>
          <HamburgerMenu
            click={isClickMenu}
            handleMenu={handleMenu}
          ></HamburgerMenu>
          {isClickMenu && <div className="background"></div>}
          <Navigation
            className={`menu menu_desktop ${isClickMenu && "menu_active"}`}
            handleMenu={handleMenu}
          />
        </Header>
      ) : (
        <Header className={`header header_place_main`}>
          <nav className="header__navigation header__navigation_place_main">
            <Link
              to="/signup"
              className="header__button header__button_color_transparent"
            >
              Регистрация
            </Link>
            <Link
              to="/signin"
              className="header__button header__button_color_green"
            >
              Войти
            </Link>
          </nav>
        </Header>
      )}

      <main className="main">
        <Promo></Promo>
        <NavTab></NavTab>
        <AboutProject></AboutProject>
        <Techs></Techs>
        <AboutMe></AboutMe>
        <Portfolio></Portfolio>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Main;
