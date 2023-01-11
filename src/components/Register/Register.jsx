import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Header from "../Header/Header";
import Form from "../Form/Form";
import "./Register.css";
import { VALID_EMAIL_REGEX, VALID_NAME_REGEX } from "../../constants/regex";

function Register(props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    props.onRegister(data);
  };

  return (
    <div className="register">
      <Header className={"register__header"}>
        <p className="register__text">Добро пожаловать!</p>
      </Header>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name={"register"}
        id={"register"}
        buttonText={"Зарегистрироваться"}
        isButtonDisabled={!isValid}
        label={"Уже зарегистрированы?"}
        link={"/signin"}
        linkText="Войти"
      >
        <label htmlFor="name" className="input-group__label">
          Имя
        </label>
        <input
          type="text"
          className="input-group__input"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name", {
            required: "Введите имя",
            validate: (value) =>
              !!value.match(VALID_NAME_REGEX) ||
              "Только латиница, кириллица, пробел или дефис",
          })}
        ></input>
        <span className="input-group__error-message">
          <ErrorMessage
            errors={errors}
            name="name"
            message={"name"}
            render={({ message }) => (
              <span className="input-group__help-text input-group__error_visible">
                {message}
              </span>
            )}
          />
        </span>

        <label htmlFor="email" className="input-group__label">
          Почта
        </label>

        <input
          type="email"
          className="input-group__input"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "Введите email",
            validate: (value) =>
              !!value.match(VALID_EMAIL_REGEX) ||
              "Не соответствует шаблону электронной почты",
          })}
        ></input>
        <span className="input-group__error-message">
          <ErrorMessage
            errors={errors}
            name="email"
            message={"email"}
            render={({ message }) => (
              <span
                role="alert"
                className="input-group__help-text input-group__error_visible"
              >
                {message}
              </span>
            )}
          />
        </span>
        <label className="input-group__label">Пароль</label>
        <input
          htmlFor="password"
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
              <span
                role="alert"
                className="input-group__help-text input-group__error_visible"
              >
                {message}
              </span>
            )}
          />
        </span>
        {
          <span className="input-group__help-text input-group__error_visible">
            {props?.errorMessage}
          </span>
        }
      </Form>
    </div>
  );
}

export default Register;
