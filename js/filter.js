'use strict';

(function () {
  var getFilters = function (value) {
    return [
      '',
      'grayscale(' + value * 1 + ')',
      'sepia(' + value * 1 + ')',
      'invert(' + value * 100 + '%)',
      'blur(' + value * 3 + 'px)',
      'brightness(' + (value * 2 + 1) + ')'
    ];
  };

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;

      startCoord = moveEvt.clientX;

      var newLocation = effectLevelPin.offsetLeft - shift;
      var filterValue = newLocation / effectLevelLine.offsetWidth;

      if (newLocation < 0 || newLocation > effectLevelLine.offsetWidth) {
        newLocation = newLocation < 0 ? 0 : effectLevelLine.offsetWidth;
        document.removeEventListener('mousemove', onMouseMove);
      }
      effectLevelPin.style.left = newLocation + 'px';
      effectLevelValue.value = Math.round(newLocation * 100 / effectLevelLine.offsetWidth);
      effectLevelDepth.style.width = (newLocation * 100 / effectLevelLine.offsetWidth) + '%';

      for (var i = 0; i < window.form.filterInputs.length; i++) {
        if (window.form.imgPreview.classList.contains('effects__preview--' + window.form.filterInputs[i].value)) {
          window.form.imgPreview.style.filter = getFilters(filterValue)[i];
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
