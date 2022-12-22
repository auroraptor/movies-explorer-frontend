import Header from "../Header/Header";
import Form from "../Form/Form";
import Input from "../Input/Input";
import "./Register.css";

function Register() {
  return (
    <article className="register">
      <Header className={"register__header"}>
        <p className="register__text">Добро пожаловать!</p>
      </Header>
      <Form
        name={"register"}
        id={"register"}
        buttonText={"Зарегистрироваться"}
        label={"Уже зарегистрированы?"}
        link={"/signin"}
        linkText="Войти"
      >
        <Input
          label="Имя"
          type="text"
          errorText={"This is help text"}
          isRequired={true}
        ></Input>
        <Input
          label="E-mail"
          type="email"
          errorText={"This is help text"}
          isRequired={true}
        ></Input>
        <Input
          label="Пароль"
          type="password"
          errorText={"This is help text"}
          isVisible={true}
          isRequired={true}
        ></Input>
      </Form>
    </article>
  );
}

export default Register;
