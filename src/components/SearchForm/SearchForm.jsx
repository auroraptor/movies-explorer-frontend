import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [formValues, setFormValues] = useState({ search: "", switch: false });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(formValues);
    clearForm(event);
  };

  const clearForm = (event) => {
    Array.from(event.target).forEach((input) => input.type === 'checkbox' ? input.checked = false : input.value = "");
  };

  return (
    <form
      name="search"
      id="search"
      className="search-form"
      onSubmit={handleSubmit}
    >
      <div className="search-form__container">
        <input
          type="search"
          className="search-form__input"
          id="site-search"
          name="search"
          placeholder="Фильм"
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
