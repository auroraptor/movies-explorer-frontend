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
      <div className="filter-checkbox__container"></div>Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
