/*global describe, beforeEach, it, expect, inject, angular*/

describe('avDocumentsResource', function() {

  'use strict';

  require('../api-documents');

  var avDocumentsResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_avDocumentsResource_) {
      avDocumentsResource = _avDocumentsResource_;
    });

  });

  it('should exist', function() {
    expect(avDocumentsResource).toBeDefined();
  });

});
