(function(root) {

  'use strict';

  var availity = root.availity;

  // Check complex, nested objects or arrays for equality
  availity.deepIsEqual = function(obj, other) {
    if(_.isArray(obj)) {
      if(!_.isArray(other) || obj.length !== other.length) {
        return false;
      }
      for(var j = 0; j < obj.length; j++) {
        if(!availity.deepIsEqual(obj[j], other[j])) {
          return false;
        }
      }
    } else if(_.isObject(obj)) {
      if(!_.isObject(other) || _.isArray(other)) {
        return false;
      }
      var keys = _.keys(obj);
      if(keys.length !== _.keys(other).length) {
        return false;
      }
      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if(!availity.deepIsEqual(obj[key], other[key])) {
          return false;
        }
      }
    } else {
      return obj === other;
    }
    return true;
  };

})(window);
