export default class Card {
  constructor(
    { cardData, handleImageClick, handleDeleteCardClick },
    cardSelector
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;

    this._handleDeleteButton = handleDeleteCardClick;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    // this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _getTemplate() {
    return (this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true));
  }

  getCardId() {
    return this._id;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement =
      this._cardElement.querySelector(".card__subheading");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
