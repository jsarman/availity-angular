'use strict';

var availity = require('../..module');
var _ = require('lodash');

availity.demo.constant('DEMO_PERMISSIONS', {
  GOOD: '452',
  BAD: '999'
});

availity.demo.controller('HasPermissionController', function($scope, DEMO_PERMISSIONS, avUserAuthorizations) {
  $scope.DEMO_PERMISSIONS = DEMO_PERMISSIONS;
  $scope.either = _.values(DEMO_PERMISSIONS);

  // This is not required but does prevent multiple hits bad to server
  avUserAuthorizations.getPermissions(_.values(DEMO_PERMISSIONS));
});
