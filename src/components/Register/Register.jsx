import Input from "../Input/Input";
import "./Register.css";

function Register() {
  return (
    <div className="register">
      <Input label="Имя" type="text" errorText={'This is help text'}></Input>
      <Input label="E-mail" type="email" errorText={'This is help text'}></Input>
      <Input label="Пароль" type="password" errorText={'This is help text'} isVisible={true}></Input>
    </div>
  );
}

export default Register;
