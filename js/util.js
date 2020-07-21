'use strict';

(function () {
  var onPressEsc = function (evt, func) {
    if (evt.key === 'Escape') {
      func();
    }
  };

  var chooseDeclination = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  var getOnlyUnique = function (it, index, pins) {
    return pins.indexOf(it) === index;
  };

  var shuffleArray = function (pins) {
    for (var i = pins.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = pins[i];
      pins[i] = pins[j];
      pins[j] = temp;
    }
    return pins;
  };

  window.util = {
    onPressEsc: onPressEsc,
    chooseDeclination: chooseDeclination,
    getOnlyUnique: getOnlyUnique,
    shuffleArray: shuffleArray
  };
})();
