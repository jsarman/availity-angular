/*global describe, beforeEach, inject, angular, expect, it*/

describe('avUserPermissionsResource', function() {

  'use strict';

  require('../api-user-permissions');
  var avUserPermissionsResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_avUserPermissionsResource_) {
      avUserPermissionsResource = _avUserPermissionsResource_;
    });

  });

  it('should exist', function() {
    expect(avUserPermissionsResource).toBeDefined();
  });

});
