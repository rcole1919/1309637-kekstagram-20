'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

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

  window.util = {
    StatusCode: StatusCode,
    getArray: getArray,
    onPressEsc: onPressEsc,
    declination: declination,
    getOnlyUnique: getOnlyUnique
  };
})();
