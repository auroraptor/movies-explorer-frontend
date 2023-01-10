import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({onSearch, placeholderText, isChecked }) {
  const [formValues, setFormValues] = useState({ search: "", checked: false });
  const [placeholder, setPlaceholder] = useState(placeholderText);
  const [checked, setChecked] = useState(isChecked);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === 'checkbox') {
      setChecked(target.checked);
    }

    setFormValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.search === '') {
      setPlaceholder('Нужно ввести ключевое слово');
      return;
    }

    onSearch(formValues);
    setChecked(formValues?.checked);
    setFormValues({ search: "", checked: false });
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
      <FilterCheckbox handleChange={handleInputChange} checked={checked}/>
    </form>
  );
}

export default SearchForm;
