import "./Input.css";

function Input({ label, type, errorText, isVisible, isRequired }) {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input
        type={type}
        className={`input-group__input input-group__error ${
          isVisible && "input-group__error_visible"
        }`}
        required={isRequired}
      ></input>
    </div>
  );
}

export default Input;
