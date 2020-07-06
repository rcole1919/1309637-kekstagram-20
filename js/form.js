'use strict';

(function () {
  var HASHTAG_RE = /^(#[a-zA-Zа-яА-Я0-9]{1,19})(\s#[a-zA-Zа-яА-Я0-9]{1,19}){0,4}$/;
  var SCALE_MAX_VALUE = 100;
  var SCALE_MIN_VALUE = 25;
  var SCALE_GRID = 25;

  var currentValue = SCALE_MAX_VALUE;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var scaleControl = document.querySelector('.img-upload__scale');
  var hashtagsInput = document.querySelector('.text__hashtags');

  scaleControl.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target === scaleControlSmaller || evt.target === scaleControlBigger) {
      var newValue = currentValue + (evt.target === scaleControlSmaller ? -SCALE_GRID : SCALE_GRID);
      if (newValue > SCALE_MAX_VALUE || newValue < SCALE_MIN_VALUE) {
        return;
      }
      currentValue = newValue;
      scaleControlValue.value = currentValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentValue * 0.01 + ')';
    }
  });

  var imgPreview = imgUploadPreview.querySelector('img');
  var filterInputs = document.querySelectorAll('.effects__radio');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  if (document.querySelector('#effect-none').checked) {
    effectLevel.style.display = 'none';
  }

  var addFilter = function (evt) {
    imgPreview.removeAttribute('class');
    imgPreview.classList.add('effects__preview--' + evt.target.value);
    imgPreview.style.filter = '';
    effectLevel.style.display = document.querySelector('#effect-none').checked ? 'none' : 'block';
    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = '100%';
  };

  var getDefaultValue = function () {
    imgPreview.removeAttribute('class');
    imgPreview.style.filter = '';
    effectLevel.style.display = 'none';
    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = '100%';
    scaleControlValue.value = '100%';
    currentValue = SCALE_MAX_VALUE;
    imgUploadPreview.style.transform = 'scale(1)';
  };

  for (var i = 0; i < filterInputs.length; i++) {
    filterInputs[i].addEventListener('change', addFilter);
  }

  hashtagsInput.addEventListener('input', function () {
    var hashtags = hashtagsInput.value.toUpperCase().split(' ');
    var onlyUnique = function (value, index, self) {
      return self.indexOf(value) === index;
    };
    if (!HASHTAG_RE.test(hashtagsInput.value)) {
      hashtagsInput.setCustomValidity('Хештег должен содержать как минимум один символ после решетки. Допустимые символы: a-z, A-Z, а-я, А-Я, 0-9. Длина хештега не более 20 символов, включая решетку. Можно ввести не более пяти хештегов');
    } else if (hashtags.length !== hashtags.filter(onlyUnique).length) {
      hashtagsInput.setCustomValidity('Хештеги не должны повторяться');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });

  var main = document.querySelector('main');
  var success = document.querySelector('#success')
    .content
    .querySelector('.success');

  var error = document.querySelector('#error')
    .content
    .querySelector('.error');

  var successButton = success.querySelector('.success__button');
  var errorButton = error.querySelector('.error__button');

  var messageHandler = function (node, button, closeFunc, onMessagePressEsc) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    main.appendChild(fragment);
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    button.addEventListener('click', closeFunc);
    document.addEventListener('keydown', onMessagePressEsc);
  };

  var successHandler = function () {
    messageHandler(success, successButton, closeSuccess, onSuccessPressEsc);
  };

  var errorHandler = function () {
    messageHandler(error, errorButton, closeError, onErrorPressEsc);
  };

  var onSuccessPressEsc = function (evt) {
    window.util.onPressEsc(evt, closeSuccess);
  };
  var onErrorPressEsc = function (evt) {
    window.util.onPressEsc(evt, closeError);
  };

  var closeMessage = function (node, button, closeFunc, onMessagePressEsc) {
    node.remove();
    button.removeEventListener('click', closeFunc);
    document.removeEventListener('keydown', onMessagePressEsc);
    getDefaultValue();
  };

  var closeSuccess = function () {
    closeMessage(success, successButton, closeSuccess, onSuccessPressEsc);
  };

  var closeError = function () {
    closeMessage(error, errorButton, closeError, onErrorPressEsc);
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  window.form = {
    hashtagsInput: hashtagsInput,
    filterInputs: filterInputs,
    imgPreview: imgPreview,
    getDefaultValue: getDefaultValue
  };
})();
