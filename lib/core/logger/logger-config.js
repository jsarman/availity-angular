'use strict';

var availity = require('../../module');

availity.core.config(function($provide) {

  $provide.decorator('$log', function($delegate, AvLogger) {
    return new AvLogger(null, $delegate);
  });

});

module.exports = availity;