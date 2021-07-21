const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DENOMINATOR = 100;

const shrinkButton = document.querySelector('.scale__control--smaller');
const enlargeButton = document.querySelector('.scale__control--bigger');
const scaleNumber = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview').children[0];

let currentScaleValue = DEFAULT_SCALE;
scaleNumber.value = `${currentScaleValue}%`;

const onButtonShrink = () => {
  if (currentScaleValue !== MIN_SCALE) {
    currentScaleValue -= SCALE_STEP;
  }

  scaleNumber.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${currentScaleValue / DENOMINATOR})`;
};

const onButtonEnlarge = () => {
  if (currentScaleValue !== DEFAULT_SCALE) {
    currentScaleValue += SCALE_STEP;
  }

  scaleNumber.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${currentScaleValue / DENOMINATOR})`;
};

shrinkButton.addEventListener('click', onButtonShrink);
enlargeButton.addEventListener('click', onButtonEnlarge);

const resetScaleSettings = () => {
  currentScaleValue = DEFAULT_SCALE;
  scaleNumber.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${DEFAULT_SCALE / DENOMINATOR})`;
};

export {imagePreview, resetScaleSettings};
