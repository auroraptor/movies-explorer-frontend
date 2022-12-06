import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import HeaderMain from '../HeaderMain/HeaderMain';
import NavTab from '../NavTab/NavTab';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';

function Main() {
  return (
    <div className="main">
        <HeaderMain></HeaderMain>
        <Promo></Promo>
        <NavTab></NavTab>
        <AboutProject></AboutProject>
        <Techs></Techs>
        <AboutMe></AboutMe>
        <Portfolio></Portfolio>
    </div>
  );
}

export default Main;