/*global inject, angular, describe, beforeEach, it, expect */

describe('avCoveragesResource', function() {

  'use strict';

  require('../api-coverages');

  var avCoveragesResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_avCoveragesResource_) {
      avCoveragesResource = _avCoveragesResource_;
    });

  });

  it('should exist', function() {
    expect(avCoveragesResource).toBeDefined();
  });

});
