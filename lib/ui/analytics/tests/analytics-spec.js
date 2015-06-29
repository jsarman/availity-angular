/* global describe, inject, spyOn, it, angular, expect, beforeEach */
describe('avAnalytics', function() {

  'use strict';

  var availity = require('../analytics');
  availity.mock = require('../../../../test/helpers').mock;

  var avAnalytics;
  var $el;

  beforeEach(function() {
    angular.mock.module('availity');
    angular.mock.module('availity.ui');
  });

  availity.mock.directiveSpecHelper();

  beforeEach(inject(function(_avAnalytics_, $q) {
    $el = availity.mock.compileDirective('<button data-av-analytics-on="click" data-av-analytics-action="save"></button>');
    avAnalytics = _avAnalytics_;
    spyOn(avAnalytics, 'trackEvent').and.callFake(function() {
      return $q.when(true);
    });
  }));

  it('should track event', function () {
    var controller = $el.data('$avAnalyticsOnController');

    spyOn(controller, 'onEvent').and.callThrough();

    $el.trigger('click');
    availity.mock.flush();
    expect(controller.onEvent).toHaveBeenCalled();
    expect(avAnalytics.trackEvent).toHaveBeenCalledWith({ event: 'click', level: 'info', action: 'save' });
  });

});
