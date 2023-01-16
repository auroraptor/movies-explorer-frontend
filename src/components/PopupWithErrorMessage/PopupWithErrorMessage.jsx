import "./PopupWithErrorMessage.css";

function PopupWithErrorMessage({ message, onOpened, onClick }) {
  const handleClick = () => onClick();

  return (
    <div className={`popup ${onOpened && "popup_is-opened"}`}>
      <div className="popup__container">
        <p className="popup__error-message">{message}</p>
        <button className="popup__button" onClick={handleClick} type="button">
          Понятно
        </button>
      </div>
    </div>
  );
}

export default PopupWithErrorMessage;
