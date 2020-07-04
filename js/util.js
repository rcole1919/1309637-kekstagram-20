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

  window.util = {
    getArray: getArray,
    onPressEsc: onPressEsc
  };
})();
