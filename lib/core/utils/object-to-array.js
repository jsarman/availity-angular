(function(root) {

  'use strict';

  var availity = root.availity;

  // Converts an object to an array
  availity.objectToArray = function(obj, keyProperty) {
    var result = [];
    _.forEach(obj, function(prop, key) {
      if(keyProperty && _.isObject(prop)) {
        prop[keyProperty] = key;
      }
      result.push(prop);
    });
    return result;
  };

})(window);
