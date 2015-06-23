// Original => https://github.com/mgcrea/angular-strap/blob/master/src/helpers/debounce.js
 var availity = require('../../module');

  availity.core.factory('avDebounce', ['$timeout','$q', function($timeout) {

    return function(fn, wait, options) {

      var timeout = null;
      options = _.merge({}, {immeditate: false, update: false}, options);

      return function() {

        var context = options.context || this;
        var args = arguments;

        var later = function() {
          timeout = null;
          if(!options.immediate) {
            fn.apply(context, args);
          }
        };

        var callNow = options.immediate && !timeout;
        if(timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait, options.update);

        if(callNow) {
          fn.apply(context,args);
        }
      };
    };
}]);

