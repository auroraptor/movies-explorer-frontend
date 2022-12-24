import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
        <label className="filter-checkbox__label">
      <input
        type="checkbox"
        name="switch"
        id="switch"
        className="filter-checkbox__switch"
        aria-label="Показывать только"
      />
      <i className="filter-checkbox__container"></i>Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
