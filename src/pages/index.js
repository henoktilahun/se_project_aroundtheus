import "./index.css";

//Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, elementSelector } from "../utils/constants.js";

// Create class instances
const CardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      console.log(elementSelector.cardTemplate);
      const cardElement = new Card(
        item,
        elementSelector.cardTemplate,
        handleImageClick
      );
      console.log(cardElement.generateCard());
      CardSection.addItems(cardElement.generateCard());
    },
  },
  //   console.log('elementselector.cardsection:')
  //   console.log(elementSelector.cardSection),
  elementSelector.cardSection
);

// Initialize all my instances
CardSection.renderItems(initialCards);

//Everything else

function handleImageClick(cardData) {
  cardImageModalImg.src = cardData.link;
  cardImageModalImg.alt = cardData.name;
  cardImageModalText.textContent = cardData.name;
  openModal(cardImageModal);
}
