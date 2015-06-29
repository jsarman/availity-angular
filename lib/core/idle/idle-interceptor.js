
'use strict';

var availity = require('../../module');

availity.core.factory('avIdleInterceptor', function(avIdle) {
  return {
    response: function(response) {
      return avIdle.response(response);
    },
    responseError: function(response) {
      return avIdle.responseError(response);
    }
  };

});

availity.core.config(function($httpProvider) {
  $httpProvider.interceptors.push('avIdleInterceptor');
});
