export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this.name = cardData.name;
    this.link = cardData.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    return (this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true));
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement =
      this._cardElement.querySelector(".card__subheading");
    this._likeButton = this._cardElement.querySelector(".card__like-button")
    this._deleteButton = this._cardElement.querySelector(".card__delete-button")

    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;
    this._cardTitleElement.textContent = this.name;
    this._setEventListeners();
    return this._cardElement;
  }
}
