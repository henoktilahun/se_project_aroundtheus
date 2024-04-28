const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise national Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Get all elements needed
const editButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#profile-add-button");
const cardAddModal = document.querySelector("#profile-add-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalcloseButton = profileEditModal.querySelector(".modal__close");
const cardModalcloseButton = cardAddModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
//const cardAddFrom = profileAddModal.querySelector(".modal__from");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/** function to close modal*/
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/** function to open modal */
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function fillProfileForm(evt) {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

/** handle when modal is saved */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModal(profileEditModal);
}

/**
 * Gets card elements
 * @param {Array} cardData - Card Data
 */
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__subheading");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  return cardElement;
}

// function openEditProfileModal(evt) {
//   evt.preventDefault();
//   fillProfileForm();
//   openModal();
// }

/** listens to event and handles it */
editButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});
addCardButton.addEventListener("click", () => openModal(cardAddModal));
profileModalcloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
cardModalcloseButton.addEventListener("click", () => closeModal(cardAddModal));
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

/** iterates through cards, gets card elemens and addes them to the HTML */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.append(cardElement);
});
