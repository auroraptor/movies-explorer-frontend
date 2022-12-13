import Logo from "../Logo/Logo";
import "./Header.css";

function Header({children, className, click}) {
  return (
    <header className={className}>
      <Logo click={click}/>
      {children}
    </header>
  );
}

export default Header;
