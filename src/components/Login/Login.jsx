import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import Input from "../Input/Input";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <header className="login__header">
        <Logo></Logo>
        <p className="login__text">Рады видеть!</p>
      </header>
      <Form
        name="login"
        id="login"
        buttonText={"Войти"}
        label={"Ещё не зарегистрированы?"}
        link={"/signup"}
        linkText={"Регистрация"}
      >
        <Input
          label="E-mail"
          type="email"
          errorText={"This is help text"}
        ></Input>
        <Input
          label="Пароль"
          type="password"
          errorText={"This is help text"}
        ></Input>
      </Form>
    </div>
  );
}

export default Login;
