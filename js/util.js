'use strict';

(function () {
  var getArray = function (number, func) {
    var pins = [];
    for (var j = 0; j < number; j++) {
      pins.push(func(j));
    }
    return pins;
  };

  var onPressEsc = function (evt, func) {
    if (evt.key === 'Escape') {
      func();
    }
  };

  var declination = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  var getOnlyUnique = function (it, index, array) {
    return array.indexOf(it) === index;
  };

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  window.util = {
    getArray: getArray,
    onPressEsc: onPressEsc,
    declination: declination,
    getOnlyUnique: getOnlyUnique,
    shuffleArray: shuffleArray
  };
})();
