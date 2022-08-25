import { getGenitiveForm } from './utils.js';
import { setDefaultAddress, resetMap, resetMainPinMarker } from './map.js';
import { sendData } from './api.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const priceSlider = adForm.querySelector('.ad-form__slider');
const roomsInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const timeSelectsGroup = adForm.querySelector('.ad-form__element--time');
const timeSelects = timeSelectsGroup.querySelectorAll('select');
const submitBtn = adForm.querySelector('.ad-form__submit');
const resetBtn = adForm.querySelector('.ad-form__reset');

const successSubmitMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorSubmitMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

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
  START: 1000,
  STEP: 1,
};

const GuestsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

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

const validatePrice = (val) =>
  parseInt(val, 10) >= PriceLimit.MIN[typeInput.value]
  && parseInt(val, 10) <= PriceLimit.MAX[typeInput.value];

const validateCapacity = (val) => GuestsCapacity[roomsInput.value].includes(val);

const initPriceRangeFilter = () => {
  const onTypeOptionsChange = () => {
    priceSlider.noUiSlider.set(priceInput.value);
  };

  noUiSlider.create(priceSlider, {
    range: {
      min: 0,
      max: Math.max(...Object.values(PriceLimit.MAX)),
    },
    start: PriceLimit.START,
    step: PriceLimit.STEP,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseInt(value, 10),
    },
  });

  priceSlider.noUiSlider.on('update', () => {
    priceInput.value = priceSlider.noUiSlider.get();
  });

  priceInput.addEventListener('change', onTypeOptionsChange);
  typeInput.addEventListener('change', onTypeOptionsChange);
};

const resetForm = () => {
  adForm.reset();
  resetMap();
  resetMainPinMarker();

  setTimeout(() => {
    setDefaultAddress();
    priceSlider.noUiSlider.set(PriceLimit.START);
  });
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showSubmitSuccessMessage = () => {
  document.body.append(successSubmitMessage);

  document.addEventListener('keydown', onSuccessMessageEscPress);
  successSubmitMessage.addEventListener('click', onSuccessMessageBodyClick);
};

const removeSubmitSuccessMessage = () => {
  successSubmitMessage.remove();

  document.removeEventListener('keydown', onSuccessMessageEscPress);
  successSubmitMessage.removeEventListener('click', onSuccessMessageBodyClick);
};

function onSuccessMessageEscPress(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    removeSubmitSuccessMessage();
  }
}

function onSuccessMessageBodyClick() {
  removeSubmitSuccessMessage();
}

const showSubmitErrorMessage = () => {
  document.body.append(errorSubmitMessage);

  document.addEventListener('keydown', onErrorMessageEscPress);
  errorSubmitMessage.addEventListener('click', onErrorMessageBodyClick);
};

const removeSubmitErrorMessage = () => {
  errorSubmitMessage.remove();

  document.removeEventListener('keydown', onErrorMessageEscPress);
  errorSubmitMessage.removeEventListener('click', onErrorMessageBodyClick);
};

function onErrorMessageEscPress(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    removeSubmitErrorMessage();
  }
}

function onErrorMessageBodyClick() {
  removeSubmitErrorMessage();
}

const onSuccessSendFormData = () => {
  submitBtn.disabled = false;

  resetForm();
  showSubmitSuccessMessage();
};

const onFailSendFormData = () => {
  submitBtn.disabled = false;

  showSubmitErrorMessage();
};

const initFormValidation = () => {
  const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error',
  }, false);

  pristine.addValidator(priceInput, validatePrice, FormError.PRICE_VALUE);
  pristine.addValidator(capacityInput, validateCapacity, FormError.CAPACITY_VALUE);

  const onTitleInputChange = () => {
    pristine.validate(titleInput);
  };

  const onTypeOptionsChange = () => {
    priceInput.placeholder = PriceLimit.MIN[typeInput.value];
    if (priceInput.value || priceInput.closest('.has-danger')) {
      pristine.validate(priceInput);
    }
  };

  const onRoomOptionsChange = () => {
    pristine.validate(capacityInput);
  };

  const onTimeSelectChange = (evt) => {
    for (const select of timeSelects) {
      if (select !== evt.target) {
        select.value = evt.target.value;
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

  const onAdFormReset = () => {
    resetForm();
    pristine.reset();
  };

  titleInput.addEventListener('change', onTitleInputChange);
  typeInput.addEventListener('change', onTypeOptionsChange);
  priceInput.addEventListener('change', onTypeOptionsChange);
  roomsInput.addEventListener('change', onRoomOptionsChange);
  capacityInput.addEventListener('change', onRoomOptionsChange);
  timeSelectsGroup.addEventListener('change', onTimeSelectChange);
  adForm.addEventListener('submit', onAdFormSubmit);
  resetBtn.addEventListener('click', onAdFormReset);
};

const initForm = () => {
  initPriceRangeFilter();
  initFormValidation();
};

export { initForm };
