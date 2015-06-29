'use strict';

var availity = require('../../../module');

availity.demo.controller('AnalyticsController', function($scope) {

  $scope.analytics = {
    createError: function() {
      throw new Error('Oh snap!');
    }
  };

});
