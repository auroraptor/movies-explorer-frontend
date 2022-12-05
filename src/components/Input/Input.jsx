import "./Input.css";

function Input({label, type, helpText}) {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input type={type}className="input-group__input"></input>
      <span className="input-group__help-text">{helpText}</span>
    </div>
  );
}

export default Input;
