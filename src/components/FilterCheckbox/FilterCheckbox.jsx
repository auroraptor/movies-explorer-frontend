import "./FilterCheckbox.css";

function FilterCheckbox({ handleChange, checked }) {
  return (
    <div className="filter-checkbox">
        <label className="filter-checkbox__label">
      <input
        type="checkbox"
        name="checked"
        id="checked"
        className="filter-checkbox__switch"
        aria-label="Показывать только"
        onChange={handleChange}
        checked={checked}
      />
      <i className="filter-checkbox__container"></i>Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
