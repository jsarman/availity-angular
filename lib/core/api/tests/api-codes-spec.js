/*global inject, describe, beforeEach, it, expect, angular*/

describe('avCodesResource', function() {

  'use strict';

  require('../api-codes');
  // availity.mock = require('../../../../test/helpers').mock;

  var avCodesResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_avCodesResource_) {
      avCodesResource = _avCodesResource_;
    });

  });

  it('should exist', function() {
    expect(avCodesResource).toBeDefined();
  });

});
