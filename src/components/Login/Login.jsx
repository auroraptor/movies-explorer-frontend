import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Header from "../Header/Header";
import Form from "../Form/Form";
import { VALID_EMAIL_REGEX } from "../../constants/regex";
import "./Login.css";
import "../Input/Input.css";

function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data, e) => {
    onLogin(data);
  };

  return (
    <div className="login">
      <Header className={"login__header"}>
        <p className="login__text">Рады видеть!</p>
      </Header>
      <Form
        name="login"
        id="login"
        buttonText={"Войти"}
        isButtonDisabled={!isValid}
        onSubmit={handleSubmit(onSubmit)}
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
            required: "Заполните Почту",
            validate: (value) =>
              !!value.match(VALID_EMAIL_REGEX) ||
              "email не соответствует шаблону электронной почты",
          })}
        ></input>
        <span className="input-group__error-message">
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
        </span>
        <label className="input-group__label">Пароль</label>
        <input
          type="password"
          className="input-group__input"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", {
            required: "Введите пароль",
          })}
        ></input>
        <span className="input-group__error-message">
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
        </span>
      </Form>
    </div>
  );
}

export default Login;
