import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__container">
        <input type="search" className="search-form__input" id="site-search" name="search" placeholder="Фильм"></input>
        <button type="submit" className="search-form__button">
          <div className="search-form__icon"></div>
        </button>
      </div>
      <FilterCheckbox/>
    </div>
  );
}

export default SearchForm;