/*global describe, it, beforeEach, expect, angular, inject*/
describe('avValDate', function() {

  'use strict';

  require('./validator-date-format');

  var dateForamt;
  var rules;

  beforeEach(angular.mock.module('availity'));

  beforeEach(inject(function(avValDate, AV_VAL) {
    dateForamt = avValDate;
    rules = {
      format: AV_VAL.DATE_FORMAT.SIMPLE
    };
  }));

  it('should be a valid', function() {
    expect(dateForamt.validate('02/02/2015', rules)).toBe(true);
  });

  it('should NOT be valid', function() {
    expect(dateForamt.validate('20/02/2015', rules)).toBe(false);
  });

  it('should use default date format if one is not provided', function() {
    expect(dateForamt.validate('02/02/2015', {})).toBe(true);
  });

});
