'use strict';

(function () {
  var fileChooser = document.querySelector('.img-upload__start input[type=file]');
  var preview = document.querySelector('.img-upload__preview img');

  fileChooser.addEventListener('change', function () {
    preview.removeAttribute('src');
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.const.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
