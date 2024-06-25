import "./index.css";

//Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, elementSelector } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

const editButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#profile-add-button");
const cardAddModal = document.querySelector("#profile-add-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const cardListElement = document.querySelector(".cards__list");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-link-input");
// const closeButtons = document.querySelectorAll(".modal__close");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
// const cardImageModal = document.querySelector("#card-image-modal");
// const cardImageModalImg = cardImageModal.querySelector(".card__image-modal");
// const cardImageModalText = cardImageModal.querySelector(".modal__description");

// Create class instances
const CardImagePopup = new PopupWithImage(elementSelector.previewImagePopup);
const CardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = new Card(
        {
          cardData,
          handleImageClick: (item) => {
            CardImagePopup.open(item);
          },
        },
        elementSelector.cardTemplate
      );
      CardSection.addItems(cardElement.generateCard());
    },
  },
  elementSelector.cardSection
);
const CardAddFormPopup = new PopupWithForm(
  elementSelector.previewAddFormPopup,
  handleAddCardFormSubmit
);
CardAddFormPopup.setEventListeners();

const ProfileEditFormPopup = new PopupWithForm(
  elementSelector.previewProfileFormPopup,
  handleProfileFormSubmit
);
ProfileEditFormPopup.setEventListeners();

// Initialize all my instances
CardSection.renderItems(initialCards);
CardImagePopup.setEventListeners();

//Everything else

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  ProfileEditFormPopup.close();
  //closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  closeModal(cardAddModal);
  evt.target.reset();
  addFormValidator.toggleButtonState();
}

/** listens to event and handles it */
editButton.addEventListener("click", () => {
  fillProfileForm();
  ProfileEditFormPopup.open();
  //openModal(profileEditModal);
});
addCardButton.addEventListener("click", () => CardAddFormPopup.open());

// closeButtons.forEach((closeButton) => {
//   const modal = closeButton.closest(".modal");
//   closeButton.addEventListener("click", () => closeModal(modal));
// });

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
cardAddForm.addEventListener("submit", handleAddCardFormSubmit);

/** VALIDATION */

const validationConfig = {
  //formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, cardAddForm);

addFormValidator.enableValidation(validationConfig);
editFormValidator.enableValidation(validationConfig);
