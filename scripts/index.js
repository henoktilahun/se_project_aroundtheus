const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise national Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
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
const cardAddForm = cardAddModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-link-input");

const cardImageModal = document.querySelector("#card-image-modal");
const cardImageModalImg = cardImageModal.querySelector(".card__image-modal");
const cardImageModalText = cardImageModal.querySelector(".modal__description");
const cardImageModalcloseButton = cardImageModal.querySelector(".modal__close");

/** function to close modal*/
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/** function to open modal */
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
  //wrapper.append(cardElement);
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

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  closeModal(cardAddModal);
}

/**
 * Gets card elements
 * @param {Array} cardData - Card Data
 */
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__subheading");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(cardImageModal);
    cardImageModalImg.src = cardData.link;
    cardImageModalImg.alt = cardData.name;
    cardImageModalText.textContent = cardData.name;
  });

  cardImageModalcloseButton.addEventListener("click", () => {
    closeModal(cardImageModal);
  });
  // on click open card image modal
  // use openmodal to open image

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  return cardElement;
}

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
cardAddForm.addEventListener("submit", handleAddCardFormSubmit);

/** iterates through cards, gets card elemens and addes them to the HTML */
initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
