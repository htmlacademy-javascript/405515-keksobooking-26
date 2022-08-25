const ALERT_SHOW_TIME = 5000;
const ALERT_TRANSITION_TIME = 1000;

const qEndingsMap = {
  room: ['комната', 'комнаты', 'комнат'],
  guest: ['гостя', 'гостей', 'гостей'],
};

const genitiveForms = {
  bungalow: 'бунгало',
  flat: 'квартиры',
  hotel: 'отеля',
  house: 'дома',
  palace: 'дворца',
};

const getQEndings = (q = 1, word) => {
  if (q % 100 < 11 || q % 100 > 14) {
    if (q % 10 === 1) {
      return `${q} ${qEndingsMap[word][0]}`;
    } else if (q % 10 > 1 && q % 10 < 5) {
      return `${q} ${qEndingsMap[word][1]}`;
    }
  }
  return `${q} ${qEndingsMap[word][2]}`;
};

const getGenitiveForm = (word) => genitiveForms[word];

const toggleFormElements = (formClass, isOn = true) => {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.querySelectorAll('select, fieldset');
  form.classList.toggle(`${formClass}--disabled`, !isOn);
  Array.from(formElements).forEach((el) => {
    el.disabled = !isOn;
  });
};

const activateMapFilters = (isOn = true) => {
  toggleFormElements('map__filters', isOn);
};

const activateAdFormElements = (isOn = true) => {
  toggleFormElements('ad-form', isOn);
};

const getRandomArrayElements = (elements, q = 10) => {
  if (elements.length <= q) {
    return elements;
  }

  let randomElements = [];

  while (randomElements.length < q) {
    const index = Math.floor(Math.random() * elements.length);

    randomElements.push(elements[index]);
    randomElements = randomElements.filter((el, i, arr) => arr.indexOf(el) === i);
  }

  return randomElements;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '8px 4px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#f0f0ea';
  alertContainer.style.backgroundColor = '#ff6547';
  alertContainer.style.transition = `opacity ${ALERT_TRANSITION_TIME}ms ease`;

  alertContainer.innerHTML = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.style.opacity = '0';
  }, ALERT_SHOW_TIME - ALERT_TRANSITION_TIME);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getQEndings,
  getGenitiveForm,
  activateMapFilters,
  activateAdFormElements,
  getRandomArrayElements,
  showAlert,
};
