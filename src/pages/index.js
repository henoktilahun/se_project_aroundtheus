import "./index.css";

/* Import all the classes */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  validationConfig,
  elementSelector,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const editButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#profile-add-button");
// const cardAddModal = document.querySelector("#profile-add-modal");
// const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
//const cardAddForm = cardAddModal.querySelector(".modal__form");
const cardAddForm = document.forms["card-form"]
//const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditForm = document.forms["profile-form"]

/* Create class instances */
const cardImagePopup = new PopupWithImage(elementSelector.previewImagePopup);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  elementSelector.cardSection
);

const cardAddFormPopup = new PopupWithForm(
  elementSelector.previewAddFormPopup,
  handleAddCardFormSubmit
);

const profileEditFormPopup = new PopupWithForm(
  elementSelector.previewProfileFormPopup,
  handleProfileFormSubmit
);

const userInfo = new UserInfo(
  elementSelector.profileTitle,
  elementSelector.profileDescription
);

/* Initialize all instances */
cardSection.renderItems();
cardImagePopup.setEventListeners();
cardAddFormPopup.setEventListeners();
profileEditFormPopup.setEventListeners();

/* Functions for handling card creations and form submits */
function createCard(cardData) {
  //   const cardElement = new Card(
  //   {
  //     cardData,
  //     handleImageClick: (item) => {
  //       cardImagePopup.open(item);
  //     },
  //   },
  //   elementSelector.cardTemplate
  // );
  const cardElement = getCard(cardData)
  cardSection.addItems(cardElement)
  //cardSection.addItems(cardElement.generateCard());
}

function getCard(cardData) {
  const cardElement = new Card(
    {
      cardData,
      handleImageClick: (item) => {
        cardImagePopup.open(item);
      },
    },
    elementSelector.cardTemplate
  );
  return cardElement.generateCard()
}

function handleProfileFormSubmit(userData) {
  userInfo.setUserInfo(userData);
  profileEditFormPopup.close();
}

function handleAddCardFormSubmit(cardData) {
  const name = cardData.name;
  const link = cardData.link;
  createCard({ name, link });
  cardAddFormPopup.close();
  cardAddForm.reset();
  addFormValidator.toggleButtonState();
}

/** listens to event and handles it */
editButton.addEventListener("click", () => {
  profileEditFormPopup.open();
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileSubtitleInput.value = userData.description;
  editFormValidator.toggleButtonState();
});
addCardButton.addEventListener("click", () => cardAddFormPopup.open());

/** VALIDATION */
const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, cardAddForm);

addFormValidator.enableValidation(validationConfig);
editFormValidator.enableValidation(validationConfig);
