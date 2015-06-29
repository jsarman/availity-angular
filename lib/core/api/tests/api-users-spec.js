/*global inject, describe, beforeEach, it, expect, angular*/

describe('avUsersResource', function() {

  'use strict';

  require('../api-users');
  var avUsersResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function( _avUsersResource_) {
      avUsersResource = _avUsersResource_;
    });

  });

  it('should exist', function() {
    expect(avUsersResource).toBeDefined();
  });

});
