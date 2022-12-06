import "./Input.css";

function Input({label, type, errorText, isVisible}) {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input type={type}className={`input-group__input ${isVisible && 'input-group__error_visible'}`}></input>
      <span className={`input-group__help-text ${isVisible && 'input-group__error_visible'}`}>{errorText}</span>
    </div>
  );
}

export default Input;
