const root = document.querySelector(".root");
const cardsContainer = root.querySelector(".places-list");
const addButton = root.querySelector(".user-info__button");
const editButton = root.querySelector(".user-info__edit-button");
const closeButton = root.querySelectorAll("[name=close-form]");
const popupPlace = root.querySelector(".place-popup");
const popupProfile = root.querySelector(".profile-popup");
const saveButton = root.querySelector(".popup__button_save");
const newCardForm = document.forms.newCard;
const userInfoForm = document.forms.userInfo;
const popupCloseImage = root.querySelector(".popup__close_image");
const popupImage = root.querySelector(".image-popup");
const cardPopup = root.querySelector(".place-popup");
const profilePopup = root.querySelector(".profile-popup");

function renderCard(name, link) {
  card = createCard(name, link);
  cardsContainer.appendChild(card);
}

const openPopup = (popup) =>{
  popup.classList.add("popup_is-opened");


  const form = popup.querySelector('.popup__form');
  validateForm(form, false);
}

const closePopup = (event) => {
  if (event.target.classList.contains("popup__close")) {
    event.target.closest(".popup").classList.remove("popup_is-opened");
  }

  if (event.target.parentElement.lastElementChild.name === 'userInfo'){
    initProfileForm();
  }
}

function editProfile(event) {
  event.preventDefault();
  const userProfileName = root.querySelector(".user-info__name");
  const userProfileJob = root.querySelector(".user-info__job");
  const { userName, userJob } = userInfoForm.elements;
  userProfileName.textContent = userName.value;
  userProfileJob.textContent = userJob.value;

  closeForm(profilePopup);
}

function openPopupImage(event) {
  if (event.target.classList.contains("place-card__image")) {
    const openImg = event.target;
    const popupImg = document.querySelector(".image-popup__image")
    const imgLink = openImg.style.backgroundImage.slice(5, -2);
    popupImg.setAttribute("src", `${imgLink}`);
    popupImageOpenToggle();
  }
}

function initProfileForm() {
  const job = document.querySelector('.user-info__job').textContent;
  const name = document.querySelector('.user-info__name').textContent;
  const nameInput = userInfoForm.querySelector('input[name="userName"]');
  const jobInput = userInfoForm.querySelector('input[name="userJob"]');
  nameInput.value = name;
  jobInput.value = job;
}

function popupImageOpenToggle() {
  popupImage.classList.toggle("popup_is-opened");
}

popupCloseImage.addEventListener("click", popupImageOpenToggle);
cardsContainer.addEventListener("click", openPopupImage);

function createCard(nameValue, linkValue) {

  const cardContainer = document.createElement("div");
  const nameElement = document.createElement("h3");
  const imageElement = document.createElement("div");
  const cardLikeButtonElement = document.createElement("button");
  const cardDeleteButtonElement = document.createElement("button");
  const cardDescriptionElement = document.createElement("div");

  cardContainer.classList.add("place-card");
  nameElement.classList.add("place-card__name");
  nameElement.textContent = nameValue;
  imageElement.classList.add("place-card__image");
  imageElement.style.backgroundImage = "url(" + linkValue + ")"
  cardLikeButtonElement.classList.add("place-card__like-icon");
  cardDeleteButtonElement.classList.add("place-card__delete-icon");
  cardDescriptionElement.classList.add("place-card__description");

  cardContainer.appendChild(imageElement);
  cardContainer.appendChild(cardDescriptionElement);
  imageElement.appendChild(cardDeleteButtonElement);
  cardDescriptionElement.appendChild(nameElement);
  cardDescriptionElement.appendChild(cardLikeButtonElement);

  return cardContainer;
}

function closeForm(popup) {
    popup.classList.remove("popup_is-opened");
    
}

function addCard(event) {
  event.preventDefault();

  const name = newCardForm.elements.name;
  const link = newCardForm.elements.link;

  closeForm(popupPlace);
  renderCard(name.value, link.value);
  newCardForm.reset();
}

function deleteCard(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
        event.target.closest(".place-card").remove();
    }
};

function likeHandler(event) {
    if (event.target.classList.contains("place-card__like-icon")) {
        event.target.classList.toggle("place-card__like-icon_liked");
    }
}

initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
});

//Валидация
function getErrorMessage(element) {
  return document.querySelector(`.popup__error-message[data-for="${element.name}"]`);
}

function checkInputValidity(element, showError) {
  if (element.tagName !== "INPUT") return true;
  const validity = element.validity;

  if(validity.valid) {
    getErrorMessage(element).textContent = " ";
    return true;
  }
  if(validity.tooShort) {
      if (showError) {
        getErrorMessage(element).textContent = "Должно быть от 2 до 30 символов";
      }
      return false;
  }
  if(validity.valueMissing) {
      if (showError) {
        getErrorMessage(element).textContent = "Обязательное поле";
      }
      return false;
  }
}

//Валидация всех форм
function validateForm(form, showErrors) {
  const inputs = form.querySelectorAll("input");
  const submitButton = form.querySelector("button[type=submit]");
  let isValid = true;
  inputs.forEach(input => {
    if (!checkInputValidity(input, showErrors)) {
      isValid = false;
    }
    });
  setSubmitButtonState(submitButton, isValid);
}

//Функция состояния кнопки
function setSubmitButtonState(submitButton, isFormValid) {
  if (isFormValid) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("button_disabled");
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add("button_disabled");
  }
}

cardsContainer.addEventListener("click", likeHandler);
cardsContainer.addEventListener("click", deleteCard);
newCardForm.addEventListener("submit", addCard);

newCardForm.addEventListener("input", function (event) {
  validateForm(event.currentTarget, true);
});
userInfoForm.addEventListener("input", function (event) {
  validateForm(event.currentTarget, true);
});
userInfoForm.addEventListener("submit", editProfile);
root.addEventListener("click", closePopup);
addButton.addEventListener("click", function(){
  openPopup(popupPlace);
});
editButton.addEventListener("click", function(){
  openPopup(popupProfile);
});
initProfileForm();
