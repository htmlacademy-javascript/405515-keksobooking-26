import { toggleFormElements, getGenitiveForm } from './utils.js';

const PriceLimit = {
  MIN: {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  },
  MAX: {
    bungalow: 100000,
    flat: 100000,
    hotel: 100000,
    house: 100000,
    palace: 100000,
  },
};

const GuestsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const adForm = document.querySelector('.ad-form');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const roomsInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const timeFieldset = adForm.querySelector('.ad-form__element--time');
const timeInputs = timeFieldset.querySelectorAll('select');

const FormError = {
  PRICE_VALUE: () => `Укажите цену ${getGenitiveForm(typeInput.value)} от ${PriceLimit.MIN[typeInput.value]} до ${PriceLimit.MAX[typeInput.value]}`,
  CAPACITY_VALUE: () => {
    if (roomsInput.value === '100') {
      return 'Это жилье предназначено не для гостей';
    }
    return capacityInput.value === '0'
      ? 'Это жилье предназначено для гостей'
      : 'Гостей не может быть больше, чем комнат';
  },
};

const activateMapFilters = (isOn = true) => {
  toggleFormElements('map__filters', isOn);
};

const activateAdFormElements = (isOn = true) => {
  toggleFormElements('ad-form', isOn);
};

const validatePrice = (val) =>
  parseInt(val, 10) >= PriceLimit.MIN[typeInput.value]
  && parseInt(val, 10) <= PriceLimit.MAX[typeInput.value];

const validateCapacity = (val) => GuestsCapacity[roomsInput.value].includes(val);

const validateForm = () => {
  const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error',
  }, false);
  pristine.addValidator(priceInput, validatePrice, FormError.PRICE_VALUE);
  pristine.addValidator(capacityInput, validateCapacity, FormError.CAPACITY_VALUE);
  const onTypeInputChange = () => {
    priceInput.placeholder = PriceLimit.MIN[typeInput.value];
    if (priceInput.value || priceInput.closest('.has-danger')) {
      pristine.validate(priceInput);
    }
  };

  const onRoomOptionsChange = () => {
    pristine.validate(capacityInput);
  };

  const onTimeInputChange = (evt) => {
    for (const input of timeInputs) {
      if (input !== evt.target) {
        input.value = evt.target.value;
      }
    }
  };

  const onAdFormSubmit = (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      submitBtn.disabled = true;
      sendData(
        onSuccessSendFormData,
        onFailSendFormData,
        new FormData(evt.target),
      );
    }
  };

  const onAdFormReset = (evt) => {
    evt.preventDefault();

    resetForm();
    pristine.reset();
  };

  typeInput.addEventListener('change', onTypeInputChange);
  roomsInput.addEventListener('change', onRoomOptionsChange);
  capacityInput.addEventListener('change', onRoomOptionsChange);
  timeFieldset.addEventListener('change', onTimeInputChange);
  adForm.addEventListener('submit', onAdFormSubmit);
};

const initForm = () => {
  activateMapFilters(false);
  activateAdFormElements(false);
  setTimeout(activateAdFormElements, 1000, true);
  validateForm();
};

export { initForm };
