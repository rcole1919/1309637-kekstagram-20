'use strict';

(function () {
  window.backend = {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('GET', window.const.URL_LOAD);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.const.StatusCode.OK) {
          onSuccess(xhr.response);
          return;
        }
        onError();
      });

      xhr.open('POST', window.const.URL_SAVE);
      xhr.send(data);
    }
  };
})();
