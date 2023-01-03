import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Header from "../Header/Header";
import Form from "../Form/Form";
import Input from "../Input/Input";
import "./Register.css";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  console.log(watch("name"));

  return (
    <div className="register">
      <Header className={"register__header"}>
        <p className="register__text">Добро пожаловать!</p>
      </Header>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        name={"register"}
        id={"register"}
        buttonText={"Зарегистрироваться"}
        label={"Уже зарегистрированы?"}
        link={"/signin"}
        linkText="Войти"
      >
        <label className="input-group__label">Имя</label>
        <input
          type="text"
          className="input-group__input"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name", {
            required: (
              <span className="input-group__hekp-text input-group__error_visible">
                Заполните имя
              </span>
            ),
            pattern: {
              value: /[A-Za-z_А-Яа-яёЁ]+/,
              message: (
                <span className="input-group__hekp-text input-group__error_visible">
                  Имя содержит только латиницу, кириллицу, пробел или дефис
                </span>
              ),
            },
          })}
        ></input>
        <ErrorMessage
          errors={errors}
          name="name"
          message={"name"}
          render={({ message }) => (
            <span className="input-group__hekp-text input-group__error_visible">
              {message}
            </span>
          )}
        />

        <label className="input-group__label">Почта</label>

        <input
          type="email"
          className="input-group__input"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: (
              <span className="input-group__hekp-text input-group__error_visible">
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
            <span className="input-group__hekp-text input-group__error_visible">
              {message}
            </span>
          )}
        />

        <label className="input-group__label">Пароль</label>

        <input
          type="password"
          className="input-group__input"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", { required: (
            <span className="input-group__hekp-text input-group__error_visible">
              Заполните Пароль
            </span>
          ), })}
        ></input>
        <ErrorMessage
          errors={errors}
          name="password"
          message={"password"}
          render={({ message }) => (
            <span className="input-group__hekp-text input-group__error_visible">
              {message}
            </span>
          )}
        />
      </Form>
    </div>
  );
}

export default Register;
