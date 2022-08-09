const getRandomIntegerNumber = (from, to) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диапазона не может быть отрицательной.');
  }

  const modifiedFrom = Math.ceil(from);
  const modifiedTo = Math.floor(to);

  return Math.floor(Math.random() * (modifiedTo - modifiedFrom + 1)) + modifiedFrom;
};

const getRandomFloatNumber = (from, to, precision = 5) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диапазона не может быть отрицательной.');
  }

  return Number((Math.random() * (to - from) + from).toFixed(precision));
};

const generateSubArray = (arr) => arr.filter(() => Math.random() < 0.5);

export { getRandomIntegerNumber, getRandomFloatNumber, generateSubArray };
