import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./SearchForm.css";
import "../FilterCheckbox/FilterCheckbox.css";
import "../Input/Input.css";

function SearchForm({ onSearch, isChecked, onFilter, searchKeyWord }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    mode: "onChange",
    defaultValues: {
      search: searchKeyWord || "",
      checked: isChecked,
    },
  });

  const onSubmit = (data) => {
    onSearch(data);
  }

  return (
    <form
      name="search"
      id="search"
      className="search-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <div className="search-form__container">
        <input
          type="search"
          className="search-form__input"
          id="site-search"
          name="search"
          placeholder="Фильм"
          required
          {...register("search", {
            required: "Нужно ввести ключевое слово",
          })}
        ></input>
        
        <button
          type="submit"
          className="search-form__button search-form__icon"
          aria-label="Найти"
        ></button>
      </div>
      <span className="input-group__error-message input-group__error-message_place_search-form">
          <ErrorMessage
            errors={errors}
            name="search"
            message={"search"}
            render={({ message }) => (
              <span className="input-group__help-text input-group__error_visible">
                {message}
              </span>
            )}
          />
        </span>
      <div className="filter-checkbox">
        <label className="filter-checkbox__label">
      <input
        type="checkbox"
        name="checked"
        id="checked"
        className="filter-checkbox__switch"
        aria-label="Показывать только"
        {...register("checked", {
          onChange: () => onFilter(!watch("checked"))
        })}
      />
      <i className="filter-checkbox__container"></i>Короткометражки</label>
    </div>
    </form>
  );
}

export default SearchForm;
