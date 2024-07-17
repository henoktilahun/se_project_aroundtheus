import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._popupFormButton = this._popupElement.querySelector(".modal__save");
    this._popupFormButtonValue = this._popupFormButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formInputs = {};
    this._inputList.forEach((input) => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
  }

  setSubmitHandler(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  renderSaving(saving) {
    if (saving) {
      this._popupFormButton.textContent = "Saving...";
    } else {
      this._popupFormButton.textContent = this._popupFormButtonValue;
    }
  }
}
