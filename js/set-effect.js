import {imagePreview} from './scale-image.js';

const effectsList = document.querySelector('.effects__list');
const originalEffect = effectsList.querySelector('#effect-none');
const sliderArea = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderArea.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

const sliderOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

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
      updateSliderOptions(sliderOptions.chrome.range.min, sliderOptions.chrome.range.max, sliderOptions.chrome.start, sliderOptions.chrome.step);
      return imagePreview.className = 'effects__preview--chrome';
    case 'sepia':
      currentEffect = 'sepia';
      measure = '';
      updateSliderOptions(sliderOptions.sepia.range.min, sliderOptions.sepia.range.max, sliderOptions.sepia.start, sliderOptions.sepia.step);
      return imagePreview.className = 'effects__preview--sepia';
    case 'marvin':
      currentEffect = 'invert';
      measure = '%';
      updateSliderOptions(sliderOptions.marvin.range.min, sliderOptions.marvin.range.max, sliderOptions.marvin.start, sliderOptions.marvin.step);
      return imagePreview.className = 'effects__preview--marvin';
    case 'phobos':
      currentEffect = 'blur';
      measure = 'px';
      updateSliderOptions(sliderOptions.phobos.range.min, sliderOptions.phobos.range.max, sliderOptions.phobos.start, sliderOptions.phobos.step);
      return imagePreview.className = 'effects__preview--phobos';
    case 'heat':
      currentEffect = 'brightness';
      measure = '';
      updateSliderOptions(sliderOptions.heat.range.min, sliderOptions.heat.range.max, sliderOptions.heat.start, sliderOptions.heat.step);
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

const onEffectSet = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    setEffect(evt.target.value);
  }
};

effectsList.addEventListener('change', onEffectSet);

const resetEffectSettings = () => {
  setEffect('none');
  originalEffect.checked = true;
};

export {resetEffectSettings};
