import Logo from "../Logo/Logo";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Logo></Logo>
      <HamburgerMenu></HamburgerMenu>
    </header>
  );
}

export default Header;
