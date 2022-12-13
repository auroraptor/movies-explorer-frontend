import { Link } from "react-router-dom";
import "./Logo.css";

function Logo({click}) {
  return <Link to="/" className={`logo ${click && 'logo_hidden'}`}></Link>
}

export default Logo;
