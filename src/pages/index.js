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
const cardAddModal = document.querySelector("#profile-add-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");

/* Create class instances */
const CardImagePopup = new PopupWithImage(elementSelector.previewImagePopup);
const CardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  elementSelector.cardSection
);

const CardAddFormPopup = new PopupWithForm(
  elementSelector.previewAddFormPopup,
  handleAddCardFormSubmit
);

const ProfileEditFormPopup = new PopupWithForm(
  elementSelector.previewProfileFormPopup,
  handleProfileFormSubmit
);

const userInfo = new UserInfo(
  elementSelector.profileTitle,
  elementSelector.profileDescription
);

/* Initialize all instances */
CardSection.renderItems();
CardImagePopup.setEventListeners();
CardAddFormPopup.setEventListeners();
ProfileEditFormPopup.setEventListeners();

/* Functions for handling card creations and form submits */
function createCard(cardData) {
  console.log(cardData);
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
}

function handleProfileFormSubmit(userData) {
  userInfo.setUserInfo(userData);
  ProfileEditFormPopup.close();
}

function handleAddCardFormSubmit(cardData) {
  const name = cardData.name;
  const link = cardData.link;
  createCard({ name, link });
  CardAddFormPopup.close();
  cardAddForm.reset();
  addFormValidator.toggleButtonState();
}

/** listens to event and handles it */
editButton.addEventListener("click", () => {
  ProfileEditFormPopup.open();
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileSubtitleInput.value = userData.description;
  editFormValidator.toggleButtonState();
});
addCardButton.addEventListener("click", () => CardAddFormPopup.open());

/** VALIDATION */
const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, cardAddForm);

addFormValidator.enableValidation(validationConfig);
editFormValidator.enableValidation(validationConfig);
