'use strict';

(function () {
  var getRandomNumber = function (value) {
    return Math.floor(Math.random() * value) + 1;
  };

  var getRandomNumberFromRange = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  var getRandomElementFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getArray = function (number, func) {
    var pins = [];
    for (var j = 0; j < number; j++) {
      pins.push(func(j));
    }
    return pins;
  };

  var onPressEsc = function (evt, input, func) {
    if (evt.key === 'Escape' && input !== document.activeElement) {
      func();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomNumberFromRange: getRandomNumberFromRange,
    getRandomElementFromArray: getRandomElementFromArray,
    getArray: getArray,
    onPressEsc: onPressEsc
  };
})();
