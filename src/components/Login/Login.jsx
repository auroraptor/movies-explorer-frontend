import Header from "../Header/Header";
import Form from "../Form/Form";
import Input from "../Input/Input";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <Header className={"login__header"}>
        <p className="login__text">Рады видеть!</p>
      </Header>
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
