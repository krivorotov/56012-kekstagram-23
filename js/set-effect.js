import {imagePreview} from './scale-image.js';

const effectsList = document.querySelector('.effects__list');
const sliderArea = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderArea.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
let currentEffect;
let measure;

sliderArea.classList.add('visually-hidden');

const updateSliderOptions = (minValue, maxValue, startValue, stepValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: stepValue,
  });

  sliderElement.noUiSlider.on('update', (values, handle) => {
    valueElement.value = values[handle];
    imagePreview.style.filter = `${currentEffect}(${valueElement.value}${measure})`;
  });
};

const setEffect = (effect) => {
  if (effect !== 'none') {
    sliderArea.classList.remove('visually-hidden');
  }

  switch (effect) {
    case 'none':
      sliderArea.classList.add('visually-hidden');
      imagePreview.style.removeProperty('filter');
      return imagePreview.className = 'effects__preview--none';
    case 'chrome':
      currentEffect = 'grayscale';
      measure = '';
      updateSliderOptions(0, 1, 1, 0.1);
      return imagePreview.className = 'effects__preview--chrome';
    case 'sepia':
      currentEffect = 'sepia';
      measure = '';
      updateSliderOptions(0, 1, 1, 0.1);
      return imagePreview.className = 'effects__preview--sepia';
    case 'marvin':
      currentEffect = 'invert';
      measure = '%';
      updateSliderOptions(0, 100, 100, 1);
      return imagePreview.className = 'effects__preview--marvin';
    case 'phobos':
      currentEffect = 'blur';
      measure = 'px';
      updateSliderOptions(0, 3, 3, 0.1);
      return imagePreview.className = 'effects__preview--phobos';
    case 'heat':
      currentEffect = 'brightness';
      measure = '';
      updateSliderOptions(1, 3, 3, 0.1);
      return imagePreview.className = 'effects__preview--heat';
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const setEffectHandler = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    setEffect(evt.target.value);
  }
};

effectsList.addEventListener('change', setEffectHandler);

const resetEffectSettings = () => {
  setEffect('none');
};

export {resetEffectSettings};

//При скрытии через Esc остается выбрана радио кнопка
