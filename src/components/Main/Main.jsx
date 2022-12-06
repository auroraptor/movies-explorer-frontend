import { Link } from 'react-router-dom';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';
import './Main.css';

function Main() {
  return (
    <div className="main">
        <Header className={"header header_place_main"}>
        <div className="main__control">
        <Link to="/signup" className="main__button main__button_transparent">Регистрация</Link>
        <Link to="/signin" className="main__button main__button_green">Войти</Link>
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