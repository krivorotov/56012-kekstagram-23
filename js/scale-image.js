const DEFAULT_SCALE = 100;
const MIN_SCALE = 0;
const SCALE_STEP = 25;
const shrinkButton = document.querySelector('.scale__control--smaller');
const enlargeButton = document.querySelector('.scale__control--bigger');
const scaleNumber = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview').children[0];

let currentScaleValue = DEFAULT_SCALE;
scaleNumber.value = `${currentScaleValue}%`;

const shrinkImage = () => {
  if (currentScaleValue !== MIN_SCALE) {
    currentScaleValue -= SCALE_STEP;
  }

  scaleNumber.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${currentScaleValue / 100})`;
};

const enlargeImage = () => {
  if (currentScaleValue !== DEFAULT_SCALE) {
    currentScaleValue += SCALE_STEP;
  }

  scaleNumber.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${currentScaleValue / 100})`;
};

shrinkButton.addEventListener('click', shrinkImage);
enlargeButton.addEventListener('click', enlargeImage);

const resetScaleSettings = () => {
  currentScaleValue = DEFAULT_SCALE;
  scaleNumber.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
};

export {imagePreview, resetScaleSettings};
