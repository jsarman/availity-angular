
'use strict';

var availity = require('../../../module');

availity.core.factory('avValRequired', function(avValUtils) {

  var validator = {
    name: 'required',
    validate: function(value) {
      return !avValUtils.isEmpty(value);
    }
  };

  return validator;

});
