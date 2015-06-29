/*global inject, angular, describe, beforeEach, it, expect*/

describe('avSession', function() {

  'use strict';

  require('../session');

  var avSession;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_$httpBackend_, _$q_, _avSession_) {
      avSession = _avSession_;
    });

  });

  it('should exist', function() {
    expect(avSession).toBeDefined();
  });


});
