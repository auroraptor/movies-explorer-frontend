import { Link } from "react-router-dom";
import Input from "../Input/Input";
import "./Register.css";

function Register() {
  return (
    <form className="register" name="register" id="register">
      <Input label="Имя" type="text" errorText={'This is help text'}></Input>
      <Input label="E-mail" type="email" errorText={'This is help text'}></Input>
      <Input label="Пароль" type="password" errorText={'This is help text'} isVisible={true}></Input>
      <div className="register__container">
        <button className="register__button" type="submit">Зарегистрироваться</button>
        <label className="register__label">Уже зарегистрированы? <Link to="/" className="register__link">Войти</Link></label>
      </div>
    </form>
  );
}

export default Register;
