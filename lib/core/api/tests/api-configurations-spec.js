/*global inject, describe, beforeEach, it, expect, angular*/

describe('avConfigurationsResource', function() {

  'use strict';
  require('../api-configurations');

  var avConfigurationsResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_$httpBackend_, _$q_, _avConfigurationsResource_) {
      avConfigurationsResource = _avConfigurationsResource_;
    });

  });

  it('should exist', function() {
    expect(avConfigurationsResource).toBeDefined();
  });

});
