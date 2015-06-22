(function(root) {

  'use strict';

  var availity = root.availity;

  // A way to extend an object's properties, including nested objects.
  availity.deepExtend = function(dest) {
    _.forEach(Array.prototype.slice.call(arguments, 1), function(source) {
      if(source) {
        for(var prop in source) {
          if(source[prop] && source[prop].constructor && source[prop].constructor === Object) {
            dest[prop] = dest[prop] || {};
            dest[prop] = availity.deepExtend(dest[prop], source[prop]);
          } else {
            dest[prop] = source[prop];
          }
        }
      }
    });
    return dest;
  };

})(window);
