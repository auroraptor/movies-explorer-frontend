import { Link } from "react-router-dom";
import "./Form.css";

function Form({ name, id, children, buttonText, label, link, linkText, onSubmit}) {
  return (
    <form className="form" name={name} id={id} noValidate onSubmit={onSubmit}>
      {children}
      <div className="form__container">
        <button className="form__button" type="submit">
          {buttonText}
        </button>
        <label className="form__label">
          {label}
          <Link to={link} className="form__link">
            {linkText}
          </Link>
        </label>
      </div>
    </form>
  );
}

export default Form;
