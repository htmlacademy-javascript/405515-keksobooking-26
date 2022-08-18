import { getQEndings } from './utils.js';

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createOfferCard = (offer) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const avatarElement = offerCard.querySelector('.popup__avatar');
  const titleElement = offerCard.querySelector('.popup__title');
  const addressElement = offerCard.querySelector('.popup__text--address');
  const priceElement = offerCard.querySelector('.popup__text--price');
  const typeElement = offerCard.querySelector('.popup__type');
  const capacityElement = offerCard.querySelector('.popup__text--capacity');
  const timeElement = offerCard.querySelector('.popup__text--time');
  const featuresElement = offerCard.querySelector('.popup__features');
  const descriptionElement = offerCard.querySelector('.popup__description');
  const photosElement = offerCard.querySelector('.popup__photos');

  const {
    author: {
      avatar
    },
    offer: {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    },
  } = offer;

  const updateImgSrc = (el, src) => {
    if (src) {
      el.src = src;
    } else {
      el.remove();
    }
  };

  const updateTextContent = (el, rule, content = rule) => {
    if (rule) {
      el.textContent = content;
    } else {
      el.remove();
    }
  };

  const updatefeatures = (el, arr) => {
    if (arr && arr.length) {
      el.innerHTML = '';

      arr.forEach((feature) => {
        const featureElement = document.createElement('li');

        featureElement.classList.add(
          'popup__feature',
          `popup__feature--${feature}`
        );

        el.append(featureElement);
      });
    } else {
      el.remove();
    }
  };

  const updatePhotos = (el, arr) => {
    if (arr && arr.length) {
      el.innerHTML = '';

      arr.forEach((photo) => {
        const photoElement = document.createElement('img');

        photoElement.classList.add('popup__photo');
        photoElement.width = '45';
        photoElement.height = '40';
        photoElement.alt = 'Фотография жилья';
        photoElement.src = photo;

        el.append(photoElement);
      });
    } else {
      el.remove();
    }
  };

  updateImgSrc(avatarElement, avatar);
  updateTextContent(titleElement, title);
  updateTextContent(addressElement, address);
  updateTextContent(priceElement, price, `${price} ₽/ночь`);
  updateTextContent(typeElement, type);
  updateTextContent(
    capacityElement,
    rooms && guests,
    `${getQEndings(rooms, 'room')} для ${getQEndings(guests, 'guest')}`
  );
  updateTextContent(
    timeElement,
    checkin && checkout,
    `Заезд после ${checkin}, выезд до ${checkout}`
  );
  updatefeatures(featuresElement, features);
  updateTextContent(descriptionElement, description);
  updatePhotos(photosElement, photos);

  return offerCard;
};

export { createOfferCard };
