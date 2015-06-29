/*global inject, angular, describe, beforeEach, it, expect*/

describe('avOrganizationsResource', function() {

  'use strict';

  require('../api-organizations');
  var avOrganizationsResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_avOrganizationsResource_) {
      avOrganizationsResource = _avOrganizationsResource_;
    });

  });

  it('should exist', function() {
    expect(avOrganizationsResource).toBeDefined();
  });

});
