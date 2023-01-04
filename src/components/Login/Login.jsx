import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Header from "../Header/Header";
import Form from "../Form/Form";
import Input from "../Input/Input";
import "./Login.css";

function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data, e) => {
    console.log(data, e);
    onLogin(data);
  };
  const onError = (errors, e) => console.log(errors, e);

  console.log(watch("email"));

  return (
    <div className="login">
      <Header className={"login__header"}>
        <p className="login__text">Рады видеть!</p>
      </Header>
      <Form
        name="login"
        id="login"
        buttonText={"Войти"}
        onSubmit={handleSubmit(onSubmit, onError)}
        label={"Ещё не зарегистрированы?"}
        link={"/signup"}
        linkText={"Регистрация"}
      >
        <label className="input-group__label">Почта</label>
        <input
          type="email"
          className="input-group__input"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: (
              <span className="input-group__help-text input-group__error_visible">
                Заполните Почту
              </span>
            ),
          })}
        ></input>
        <ErrorMessage
          errors={errors}
          name="email"
          message={"email"}
          render={({ message }) => (
            <span className="input-group__help-text input-group__error_visible">
              {message}
            </span>
          )}
        />
        <label className="input-group__label">Пароль</label>
        <input
          type="password"
          className="input-group__input"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", {
            required: (
              <span className="input-group__help-text input-group__error_visible">
                Заполните Пароль
              </span>
            ),
          })}
        ></input>
        <ErrorMessage
          errors={errors}
          name="password"
          message={"password"}
          render={({ message }) => (
            <span className="input-group__help-text input-group__error_visible">
              {message}
            </span>
          )}
        />
        {/* ƒ */}
        {/* <Input
          label="E-mail"
          type="email"
          errorText={"This is help text"}
          isRequired={true}
        ></Input>
        <Input
          label="Пароль"
          type="password"
          errorText={"This is help text"}
          isRequired={true}
        ></Input> */}
      </Form>
    </div>
  );
}

export default Login;
