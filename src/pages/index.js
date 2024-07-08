import "./index.css";

/* Import all the classes */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  //   initialCards,
  validationConfig,
  elementSelector,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const editButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#profile-add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const cardAddForm = document.forms["card-form"];

/* Create class instances */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c8734e87-d2e1-4745-a6e7-7e6331a1aed2",
    "Content-Type": "application/json",
  },
});

//api.getInitialCards().then((res) => console.log(res));
//api.deleteCard("668b548a8bacc8001afade41").then((res) => console.log(res));

const cardImagePopup = new PopupWithImage(elementSelector.previewImagePopup);
const cardSection = new Section(
  {
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

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
});

/* Initialize all instances */
api.getInitialCards().then((cards) => {
  cardSection.renderItems(cards);
});

cardImagePopup.setEventListeners();
cardAddFormPopup.setEventListeners();
profileEditFormPopup.setEventListeners();

/* Functions for handling card creations and form submits */
function createCard(cardData) {
  const cardElement = getCard(cardData);
  cardSection.addItems(cardElement);
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
  return cardElement.generateCard();
}

function handleProfileFormSubmit(userData) {
  userInfo.setUserInfo(userData);
  profileEditFormPopup.close();
}

function handleAddCardFormSubmit(cardData) {
  api.addCard(cardData).then((cardData) => {
    const name = cardData.name;
    const link = cardData.link;
    createCard({ name, link });
    cardAddFormPopup.close();
    cardAddForm.reset();
  });
}

/** listens to event and handles it */
editButton.addEventListener("click", () => {
  profileEditFormPopup.open();
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileSubtitleInput.value = userData.description;
  formValidators["profile-form"].toggleButtonState();
});
addCardButton.addEventListener("click", () => {
  cardAddFormPopup.open();
  formValidators["card-form"].toggleButtonState();
});

/** VALIDATION */
const formValidators = {};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formId = formElement.getAttribute("id");

    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
