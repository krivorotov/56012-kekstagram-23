import {getImageContent} from './get-images.js';

function getMocks (number) {
  let count = 1;

  return new Array(number).fill(null).map(() => getImageContent(count++));
}

getMocks(25);
