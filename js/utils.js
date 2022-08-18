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

const getRandomIntegerNumber = (from, to) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диаппазона не может быть отрицательной.');
  }
  if (from > to) {
    throw new RangeError('Верхняя граница диаппазона не может быть меньше нижней.');
  }
  if (Number.isNaN(+from) || (Number.isNaN(+to))) {
    throw new RangeError('Невозможно представить все параметры функции в виде числа');
  }
  const modifiedFrom = Math.ceil(from);
  const modifiedTo = Math.floor(to);
  return Math.floor(Math.random() * (modifiedTo - modifiedFrom + 1)) + modifiedFrom;
};

const getRandomFloatNumber = (from, to, precision = 5) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диаппазона не может быть отрицательной.');
  }
  if (from > to) {
    throw new RangeError('Верхняя граница диаппазона не может быть меньше нижней.');
  }
  if (Number.isNaN(+from) || (Number.isNaN(+to))) {
    throw new RangeError('Невозможно представить все параметры функции в виде числа');
  }
  return Number((Math.random() * (to - from) + from).toFixed(precision));
};

const generateSubArray = (arr) => arr.filter(() => Math.random() < 0.5);
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

export {
  getRandomIntegerNumber,
  getRandomFloatNumber,
  generateSubArray,
  getQEndings,
  getGenitiveForm,
  toggleFormElements,
};
