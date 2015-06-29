/*global inject, describe, beforeEach, it, expect, angular*/

describe('avLogMessagesResource', function() {

  'use strict';

  require('../api-log-messages');
  var avLogMessagesResource;

  beforeEach(function() {

    angular.mock.module('availity');

    inject(function(_avLogMessagesResource_) {
      avLogMessagesResource = _avLogMessagesResource_;
    });

  });

  it('should exist', function() {
    expect(avLogMessagesResource).toBeDefined();
  });

});
