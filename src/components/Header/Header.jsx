import Logo from "../Logo/Logo";
import "./Header.css";

function Header({children, className}) {
  return (
    <header className={className}>
      <Logo></Logo>
      {children}
    </header>
  );
}

export default Header;
