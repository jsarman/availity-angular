/*global describe, inject, it, beforeEach, expect, angular*/

describe('avTemplateCache', function() {

  'use strict';

  var availity = require('../template');
  availity.mock = require('../../../../test/helpers').mock;

  var $httpBackend;
  var avTemplateCache;

  beforeEach(function() {
    angular.mock.module('availity');
    angular.mock.module('availity.ui');
  });

  beforeEach(inject(function(_$httpBackend_, _avTemplateCache_) {
    $httpBackend = _$httpBackend_;
    avTemplateCache = _avTemplateCache_;
  }));

  availity.mock.serviceSpecHelper();


  var fixtures = {
    'default': '<div>hi</div>'
  };

  it('should respond with markup with option `template`', function() {

    var options = {template: fixtures['default']};

    avTemplateCache.get(options).then(function(template) {
      expect(template).toBe(fixtures['default']);
    });

    availity.mock.$scope.$apply();

  });

  it('should respond with markup with option `tempalteUrl`', function() {

    $httpBackend.expectGET('demo/tpl.html').respond(fixtures['default']);

    var options = {templateUrl: 'demo/tpl.html'};

    avTemplateCache.get(options).then(function(template) {
      expect(template).toBe(fixtures['default']);
    });

    $httpBackend.flush();
    availity.mock.$scope.$apply();

  });



});
