import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <form name="search" id="search" className="search-form" onSubmit={() => alert('not really submit')}>
      <div className="search-form__container">
        <input type="search" className="search-form__input" id="site-search" name="search" placeholder="Фильм"></input>
        <button type="submit" className="search-form__button search-form__icon" aria-label="Найти">
        </button>
      </div>
      <FilterCheckbox/>
    </form>
  );
}

export default SearchForm;