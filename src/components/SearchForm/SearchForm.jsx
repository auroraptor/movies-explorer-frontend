import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({onSearch}) {
  const [formValues, setFormValues] = useState({ search: "", shortFilm: false });
  const [placeholder, setPlaceholder] = useState("Фильм");

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.search === '') {
      setPlaceholder('Нужно ввести ключевое слово');
      return;
    }

    onSearch(formValues);
    setPlaceholder(formValues?.search || "Фильм");
    setFormValues({ search: "", shortFilm: false });
    clearForm(event);
  };

  const clearForm = (event) => {
    Array.from(event.target).forEach((input) => input.type === 'checkbox' ? input.checked : input.value = "");
  };


  return (
    <form
      name="search"
      id="search"
      className="search-form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <div className="search-form__container">
        <input
          type="search"
          className="search-form__input"
          id="site-search"
          name="search"
          placeholder={placeholder}
          required
          onChange={handleInputChange}
        ></input>
        <button
          type="submit"
          className="search-form__button search-form__icon"
          aria-label="Найти"
        ></button>
      </div>
      <FilterCheckbox handleChange={handleInputChange} />
    </form>
  );
}

export default SearchForm;
