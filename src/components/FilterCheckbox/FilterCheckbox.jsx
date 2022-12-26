// import { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleChange }) {
  return (
    <div className="filter-checkbox">
        <label className="filter-checkbox__label">
      <input
        type="checkbox"
        name="shortFilm"
        id="shortFilm"
        className="filter-checkbox__switch"
        aria-label="Показывать только"
        onChange={handleChange}
      />
      <i className="filter-checkbox__container"></i>Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
