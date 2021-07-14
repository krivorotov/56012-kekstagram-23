import {getRandomPositiveInteger} from './get-random-positive-integer.js';

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

export {getRandomArrayElement};
