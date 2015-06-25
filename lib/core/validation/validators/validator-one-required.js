(function(root) {

  'use strict';

  var availity = root.availity;

  availity.core.factory('avValOneRequired', function(avValUtils) {

    var validator =  {
      name: 'oneRequired',
      validate: function(values) {
        var atLeastOne = false;
        _.forEach(values, function(value) {
          atLeastOne = atLeastOne || !avValUtils.isEmpty(value);
        });
        return atLeastOne;
      }
    };

    return validator;

  });
})(window);
