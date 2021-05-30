function getRandomInteger(min, max) {
  if (min >= max) {
    return 'Неправильно указан диапазон чисел.';
  }
  // Решение отсюда: https://learn.javascript.ru/task/random-min-max
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

getRandomInteger();

function checkStringLength (str, maxLength) {
  return (str.length <= maxLength);
}

checkStringLength();
