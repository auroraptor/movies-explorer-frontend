import Input from "../Input/Input";
import "./Register.css";

function Register() {
  return (
    <div className="register">
      <Input label="Имя" type="text" helpText={'This ih help text'}></Input>
      <Input label="E-mail" type="email" helpText={'This ih help text'}></Input>
      <Input label="Пароль" type="password" helpText={'This ih help text'}></Input>
    </div>
  );
}

export default Register;
