/* Объявляем константы */

const cardsContainer = document.querySelector('.page__grid-items');
const cardTemplate = document.querySelector('.grid__template').content;
const card = cardTemplate.querySelector('.grid-items__item');

const popupImg = document.querySelector('.popup__img');
const popupImgDescription = document.querySelector('.popup__description');
const popupZoomImgContainer = document.querySelector('.popup_zoom-image');
const popupAddPicture = document.querySelector('.page__picture-changes');
const popupEditProfileName = document.querySelector('.page__names-changes');
const popupPictureNameInput = document.querySelector('#name__place');
const popupPictureLinkInput = document.querySelector('#picture__link');
const popupButtonCreateNewCard = document.querySelector('#popup__createButton');
const popupProfileNameInput = document.querySelector('#popup__formName');
const popupProfilePositionInput = document.querySelector('#popup__formPosition');

const crossButtonClosePopupImg = document.querySelector('.popup-button_type_close');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__description');
const buttonOpenPopupAddPicture = document.querySelector('.profile__plus-container');
const buttonEditProfileName = document.querySelector('.profile__edit-button');
const buttonClosePopupEditName = document.querySelector('.popup__close-button');
const buttonClosePopupEditPicture = document.querySelector('#popup__close-button');


/*Создание функций*/

/* Загрузка массива карточек */

initialCards.forEach(function(item) {
  cardsContainer.append(createCard(item.name, item.link, item.pictureName));
});


/* Открытия попапа */

function openPopup(popup) {
  popup.classList.add("popup_opened");
};

/* Закрытия попапа */

function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

/* Редактрование имени и рода занятий из попапа */

const formEditProfile = document.querySelector('#popup__profile-form');

formEditProfile.addEventListener('submit', function(el) {
  if (popupProfileNameInput.value === '' || popupProfilePositionInput.value === '') {
    alert("Вы забыли указать имя или вид вашей деятельности!");
    el.preventDefault();
  }
  else {
    el.preventDefault();
    profileName.textContent = popupProfileNameInput.value;
    profilePosition.textContent = popupProfilePositionInput.value;
    closePopup(popupEditProfileName);
  }
});

/* Открытие и закрытие попапа для редактирования имени и рода занятий */

buttonEditProfileName.addEventListener('click', function() {
  openPopup(popupEditProfileName);
  popupProfileNameInput.value = profileName.textContent;
  popupProfilePositionInput.value = profilePosition.textContent;

});
buttonClosePopupEditName.addEventListener('click', function() {
  closePopup(popupEditProfileName);
});

/* Создания карточки */

function createCard(name, link, pictureName) {
  const cardCopy = card.cloneNode(true);
  const cardImg = cardCopy.querySelector('.grid-items__img');
  cardCopy.querySelector('.grid-items__place-name').textContent = name;
  cardImg.src = link;
  cardImg.alt = pictureName;

  clickOnLikeCard(cardCopy.querySelector('.grid-items__heart'));
  deleteCard(cardCopy.querySelector('.grid-items__trash'));

  cardImg.addEventListener('click', function() {
    openPopup(popupZoomImgContainer);
    popupImgDescription.textContent = name;
    popupImg.src = link;
    popupImg.alt = pictureName;
  });
  return cardCopy;
}

/* Удаление карточек */

function deleteCard(trash) {
  trash.addEventListener('click', function(el) {
    el.target.closest('.grid-items__item').remove();
  });
};

/* Добавление и удаление карточки */

const formAddCard = document.querySelector('#popup__picture-profile-form');

formAddCard.addEventListener('submit', function(el) {
  if (popupPictureNameInput.value === '' || popupPictureLinkInput.value === '') {
    alert("Необходимо ввести название и ссылку на изображение");
    openPopup(popupAddPicture);
    el.preventDefault();
  }
  else {
    el.preventDefault();
    cardsContainer.prepend(createCard(popupPictureNameInput.value, popupPictureLinkInput.value));
  }
});

/* Лайки в карточках */

function clickOnLikeCard(heart) {
  heart.addEventListener('click', function(el) {
    el.target.classList.toggle('grid-items__heart_type_active');
  });
};

/* Закрытие попапа картинки */

crossButtonClosePopupImg.addEventListener('click', function() {
  closePopup(popupZoomImgContainer);
});

/* Закрытие попапа создания новой карточки */

popupButtonCreateNewCard.addEventListener('click', function() {
  closePopup(popupAddPicture);
});


/* Открытие и закрытие попапа для добавления картинки и её названия */

buttonOpenPopupAddPicture.addEventListener('click', function() {
  openPopup(popupAddPicture);
  formAddCard.reset();
});

buttonClosePopupEditPicture.addEventListener('click', function() {
  closePopup(popupAddPicture);
});




