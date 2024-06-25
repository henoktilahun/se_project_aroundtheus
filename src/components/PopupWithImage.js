import Popup from "./Popup.js";

export default class popupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImageElement =
      this._popupElement.querySelector(".card__image-modal");
    this._cardTitleElement = this._popupElement.querySelector(
      ".modal__description_image-popup"
    );
  }

  open(data) {
    this._cardImageElement.src = data._link;
    this._cardImageElement.alt = data._name;
    this._cardTitleElement.textContent = data.name;
    super.open();
  }
}
