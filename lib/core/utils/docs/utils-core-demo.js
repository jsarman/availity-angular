'use strict';

var availity = require('../../../module');

availity.demo.controller('UtilsController', function($scope) {

  $scope.utils = {
    print: function() {
      availity.print();
    }
  };

});
