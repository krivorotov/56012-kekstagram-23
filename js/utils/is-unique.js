const isUnique = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) !== i) {
      return true;
    }
  }
  return false;
};

export {isUnique};
