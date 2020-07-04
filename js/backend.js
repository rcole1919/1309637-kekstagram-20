'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_SAVE = 'https://javascript.pages.academy/kekstagram';

  window.load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };
})();
