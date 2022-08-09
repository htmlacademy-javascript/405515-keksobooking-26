import { getRandomIntegerNumber, getRandomFloatNumber, generateSubArray } from './utils.js';

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const OFFER_TYME_VALUES = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jp',
];

const createOffer = () => {
  const lat = getRandomFloatNumber(35.65, 35.7, 5);
  const lng = getRandomFloatNumber(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${getRandomIntegerNumber(1, 10).toString().padStart(2, '0')}.png`,
    },
    offer: {
      title: 'Сдам',
      address: `${lat}, ${lng}`,
      price: getRandomIntegerNumber(1000, 100000),
      type: OFFER_TYPES[getRandomIntegerNumber(0, OFFER_TYPES.length - 1)],
      rooms: getRandomIntegerNumber(1, 10),
      guests: getRandomIntegerNumber(1, 10),
      checkin: OFFER_TYME_VALUES[getRandomIntegerNumber(0, OFFER_TYME_VALUES.length - 1)],
      checkout: OFFER_TYME_VALUES[getRandomIntegerNumber(0, OFFER_TYME_VALUES.length - 1)],
      features: generateSubArray(OFFER_FEATURES),
      description: 'Здесь можно жить',
      photos: generateSubArray(OFFER_PHOTOS),
    },
    location: {
      lat,
      lng,
    },
  };
};

const createOffers = (quantity = 10) => Array.from({ length: quantity }, createOffer);

export { createOffers };
