 var availity = require('../../../module');

  availity.core.factory('avValUtils', function() {

    return {

      isDefined: function(value) {
        return angular.isDefined(value) && value !== '' && value !== null;
      },

      isEmpty: function(value) {
        return !this.isDefined(value) || $.trim(value) === '';
      }
    };

  });

