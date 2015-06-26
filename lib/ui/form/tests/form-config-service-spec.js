/*global inject, expect, jasmine, describe, it, spyOn, beforeEach, module*/
describe('Form Config', function () {
  'use strict';
  var configurationsResourceMock;
  var $rootScope;
  var $q;

  describe('form config service', function () {
    beforeEach(module('availity'));
    beforeEach(module('availity.ui'));
    beforeEach(function() {
      configurationsResourceMock = {
        all: function() { return {configurations: [{id: 1}]}; }
      };
      module(function($provide) {
        $provide.value('avConfigurationsResource', configurationsResourceMock);
      });
    });
    beforeEach(inject(function(_$rootScope_, _$q_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
    }));

    describe('get request form', function() {
      it('gets default configuration if payer ID not specified', inject(function (avFormConfigService) {
        spyOn(avFormConfigService, '_buildRequestForm');
        avFormConfigService.getRequestForm({id: '2'}, {}, {}, {'270': 1}, '270');
        $rootScope.$apply();
        expect(avFormConfigService._buildRequestForm).toHaveBeenCalledWith(jasmine.any(Object), {id: '2'}, 1, undefined, undefined, {});
      }));
      /*it('gets payer configuration if payer ID specified', inject(function (avFormConfigService) {
        spyOn(avFormConfigService, '_buildRequestForm');
        avFormConfigService._getConfiguration = function() { return {then: function(fn){ return fn.apply(avFormConfigService, [[{id: 1}]]); }}; };
        avFormConfigService.getRequestForm({id: '2'}, '270', 'BCBSF', '1194');
        $rootScope.$apply();
        expect(avFormConfigService._buildRequestForm).toHaveBeenCalledWith(jasmine.any(Object), {id: '2'}, {id: 1}, undefined, undefined, undefined, {});
      }));*/
    });

    describe('build request form', function() {
      it('creates form element', inject(function (avFormConfigService) {
        var formTemplate = '<div class="container"><label>Header</label><div data-inject="true"></div></div>';
        var formConfig = {template: formTemplate, containers: [{}]};
        avFormConfigService._buildElementContainer = function() { return $('<span class="child"></span>'); };
        var deferred =$q.defer();
        avFormConfigService._buildRequestForm(deferred, formConfig);
        deferred.promise.then(function(form) {
          var expectedOutcome = '<span class="child"></span>';
          expect(form[0].outerHTML).toBe(expectedOutcome);
        });
      }));
    });

    describe('build element container', function() {
      it('doesnt fail if no elements exist', inject(function(avFormConfigService) {
        var containerConfig = {template: '<div><div data-inject="true"></div></div>'};
        expect(avFormConfigService._buildElementContainer(containerConfig)[0].outerHTML.toLowerCase()).toBe('<div><div data-inject="true"></div></div>');
      }));
      it('appends child containers', inject(function(avFormConfigService) {
        var containerConfig = {
          template: '<div data-inject="true"></div>',
          elements: {childContainer: {template: '<span data-inject="true"></span>', elements: {}}}
        };
        expect(avFormConfigService._buildElementContainer(containerConfig, {elements: {}})[0].outerHTML.toLowerCase()).toBe('<div data-inject="true"><span data-inject="true"></span></div>');
      }));
      it('doesnt fail if element returned is not defined', inject(function(avFormConfigService) {
        var containerConfig = {
          template: '<div data-inject="true"></div>',
          elements: {memberId: {}}
        };
        avFormConfigService._buildElement = function() { return; };
        expect(avFormConfigService._buildElementContainer(containerConfig, {elements: {}})[0].outerHTML.toLowerCase()).toBe('<div data-inject="true"></div>');
      }));
      it('appends elements', inject(function(avFormConfigService) {
        var containerConfig = {
          template: '<div data-inject="true"></div>',
          elements: {memberId: {}}
        };
        avFormConfigService._buildElement = function() { return $('<input name="memberId" type="text">'); };
        expect(avFormConfigService._buildElementContainer(containerConfig, {elements: {}})[0].outerHTML.toLowerCase()).toBe('<div data-inject="true"><input name="memberid" type="text"></div>');
      }));
    });

    describe('update element model', function() {
      var models;
      beforeEach(function() {
        models = {
          memberId: 'abc',
          patientId: '123',
          birthDate: '20150102',
          serviceType: {code: '30', value: 'Health Benefit Plan Coverage'}
        };
      });
      it('does nothing if config specifies to ignore default value', inject(function(avFormConfigService) {
        avFormConfigService._updateElementModel('memberId', {ignoreDefaultValues: true}, {defaultValue: 'hello'}, models);
        expect(models.memberId).toBe('abc');
        expect(models.patientId).toBe('123');
      }));
      it('does nothing if default value undefined and should not set to undefined', inject(function(avFormConfigService) {
        avFormConfigService._updateElementModel('memberId', {setAsUndefinedIfNoDefaultValue: false}, {}, models);
        expect(models.memberId).toBe('abc');
        expect(models.patientId).toBe('123');
      }));
      it('does nothing if default value undefined and should not set to undefined', inject(function(avFormConfigService) {
        avFormConfigService._updateElementModel('memberId', {existingValuesOverrideDefaultValues: true}, {defaultValue: 'hello'}, models);
        expect(models.memberId).toBe('abc');
        expect(models.patientId).toBe('123');
      }));
      it('updates using element ID if model key is not defined', inject(function(avFormConfigService) {
        avFormConfigService._updateElementModel('memberId', {}, {defaultValue: 'hello'}, models);
        expect(models.memberId).toBe('hello');
        expect(models.patientId).toBe('123');
      }));
      it('updates using model key if model key is defined', inject(function(avFormConfigService) {
        avFormConfigService._updateElementModel('memberId', {modelKey: 'patientId'}, {defaultValue: 'hello'}, models);
        expect(models.memberId).toBe('abc');
        expect(models.patientId).toBe('hello');
      }));
      it('uses MMDDYYYY for date format if one isnt specified', inject(function(avFormConfigService) {
        avFormConfigService._updateElementModel('birthDate', {}, {type: 'Date', defaultValue: '2014-12-15T12:00:00.000+0000'}, models);
        expect(models.birthDate).toBe('12152014');
      }));
      it('uses specified format for date format if one is specified', inject(function(avFormConfigService) {
        avFormConfigService._updateElementModel('birthDate', {dateFormat: 'MM-DD-YYYY'}, {type: 'Date', defaultValue: '2014-12-15T12:00:00.000+0000'}, models);
        expect(models.birthDate).toBe('12-15-2014');
      }));
      it('sets repeat values for enum types', inject(function(avFormConfigService) {
        var payerConfig = {
          type: 'Enumeration',
          defaultValue: {
            'code': '60',
            'value': 'General Benefits'
          },
          values: [
            {
              'code': '60',
              'value': 'General Benefits'
            },
            {
              'code': 'BT',
              'value': 'Gynecological'
            },
            {
              'code': '30',
              'value': 'Health Benefit Plan Coverage'
            }
          ]
        };
        avFormConfigService._updateElementModel('serviceType', {repeatKey: 'serviceTypes'}, payerConfig, models);
        expect(models.serviceTypes).toBeDefined();
        expect(models.serviceTypes.length).toBe(3);
      }));
      it('uses code for enum key if one isnt specified', inject(function(avFormConfigService) {
        var payerConfig = {
          type: 'Enumeration',
          defaultValue: {
            'code': '60',
            'value': 'General Benefits'
          },
          values: [
          {
            'code': '60',
            'value': 'General Benefits'
          },
          {
            'code': 'BT',
            'value': 'Gynecological'
          },
          {
            'code': '30',
            'value': 'Health Benefit Plan Coverage'
          }
          ]
        };
        avFormConfigService._updateElementModel('serviceType', {repeatKey: 'serviceTypes'}, payerConfig, models);
        expect(models.serviceType.code).toBe('60');
      }));
      it('uses specified enum key for enum key if one is specified', inject(function(avFormConfigService) {
        var payerConfig = {
          type: 'Enumeration',
          defaultValue: {
            'id': '60',
            'value': 'General Benefits'
          },
          values: [
             {
              'id': '60',
              'value': 'General Benefits'
            },
            {
              'id': 'BT',
              'value': 'Gynecological'
            },
            {
              'id': '30',
              'value': 'Health Benefit Plan Coverage'
            }
          ]
        };
        avFormConfigService._updateElementModel('serviceType', {enumKey: 'id', repeatKey: 'serviceTypes'}, payerConfig, models);
        expect(models.serviceType.id).toBe('60');
      }));
    });

    describe('update element validation rules', function() {
      var element;
      var baseElementConfig;
      var payerElementConfig;
      var ruleSets;
      beforeEach(function() {
        element = $('<input name="memberId" type="text">');
        baseElementConfig = {};
        payerElementConfig = {};
        ruleSets = {};
      });

      it('doesnt add new rules if rules set ID not defined', inject(function(avFormConfigService) {
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId).toBeUndefined();
      }));
      it('defines error message from payer config', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        payerElementConfig.errorMessage = 'You borked it!';
        payerElementConfig.required = true;
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId.required.message).toBe('You borked it!');
      }));
      it('defines rule set using rule set ID when specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'myId';
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.myId).toBeDefined();
      }));
      it('does not add required validator if not specified by payer', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        baseElementConfig.ignoreRequiredFlag = false;
        payerElementConfig.required = false;
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId).toBeDefined();
        expect(ruleSets.memberId.required).toBeUndefined();
      }));
      it('does not add required validator if ignored by base config', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        baseElementConfig.ignoreRequiredFlag = true;
        payerElementConfig.required = true;
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId).toBeDefined();
        expect(ruleSets.memberId.required).toBeUndefined();
      }));
      it('adds required validator when specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        baseElementConfig.ignoreRequiredFlag = false;
        payerElementConfig.required = true;
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId).toBeDefined();
        expect(ruleSets.memberId.required).toBeDefined();
      }));
      it('does not add pattern if not specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId).toBeDefined();
        expect(ruleSets.memberId.regex).toBeUndefined();
      }));
      it('adds pattern when specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        payerElementConfig.pattern = /$\w*^/;
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId).toBeDefined();
        expect(ruleSets.memberId.pattern).toBeDefined();
      }));
      it('does not add date validation if none are specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'asOfDate';
        payerElementConfig.type = 'Date';
        avFormConfigService._updateElementValidationRules('asOfDate', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.asOfDate).toBeDefined();
        expect(ruleSets.asOfDate.dateFormat).toBeUndefined();
      }));
      it('adds date format validator', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'asOfDate';
        payerElementConfig.type = 'Date';
        baseElementConfig.dateFormat = 'MMDDYYYY';
        avFormConfigService._updateElementValidationRules('asOfDate', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.asOfDate).toBeDefined();
        expect(ruleSets.asOfDate.dateFormat).toBeDefined();
      }));
      it('does not add date range validator if min not specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'asOfDate';
        payerElementConfig.type = 'Date';
        payerElementConfig.max = '2099-12-31T23:59:59.999+0000';
        avFormConfigService._updateElementValidationRules('asOfDate', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.asOfDate).toBeDefined();
        expect(ruleSets.asOfDate.dateRange).toBeUndefined();
      }));
      it('does not add date range validator if max not specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'asOfDate';
        payerElementConfig.type = 'Date';
        payerElementConfig.min = '2000-01-01T00:00:00.000+0000';
        avFormConfigService._updateElementValidationRules('asOfDate', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.asOfDate).toBeDefined();
        expect(ruleSets.asOfDate.dateRange).toBeUndefined();
      }));
      it('adds date range validator if min and max are specified', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'asOfDate';
        payerElementConfig.type = 'Date';
        payerElementConfig.min = '2000-01-01T00:00:00.000+0000';
        payerElementConfig.max = '2099-12-31T23:59:59.999+0000';
        baseElementConfig.dateFormat = 'MMDDYYYY';
        avFormConfigService._updateElementValidationRules('asOfDate', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.asOfDate).toBeDefined();
        expect(ruleSets.asOfDate.dateRange).toBeDefined();
      }));
      it('does not add array size validator if enumeration does not allow repeats', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'serviceType';
        payerElementConfig.type = 'Enumeration';
        payerElementConfig.repeats = false;
        avFormConfigService._updateElementValidationRules('serviceType', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.serviceType).toBeDefined();
        expect(ruleSets.serviceType.arraySize).toBeUndefined();
      }));
      it('adds array size validator if enumeration allows repeats', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'serviceType';
        payerElementConfig.type = 'Enumeration';
        payerElementConfig.repeats = true;
        payerElementConfig.minRepeats = 1;
        payerElementConfig.maxRepeats = 99;
        avFormConfigService._updateElementValidationRules('serviceType', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.serviceType).toBeDefined();
        expect(ruleSets.serviceType.size).toBeDefined();
      }));
      it('applies max length property to element if max length defined and element is input', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        payerElementConfig.maxLength = '17';
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(element.attr('maxlength')).toBe('17');
      }));
      it('applies max length property to elements input if max length defined and element is not input', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        payerElementConfig.maxLength = '17';
        element = $('<div><input name="memberId" type="text"></div>');
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(element.find('input').attr('maxlength')).toBe('17');
      }));
      it('applies default max length property to element if max length not defined', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        baseElementConfig.defaults = {maxLength: '17'};
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(element.attr('maxlength')).toBe('17');
      }));
      it('applies additional validators', inject(function(avFormConfigService) {
        baseElementConfig.ruleSetId = 'memberId';
        baseElementConfig.additionalValidators = {
          additional1: 1,
          additional2: 2
        };
        avFormConfigService._updateElementValidationRules('memberId', element, baseElementConfig, payerElementConfig, ruleSets);
        expect(ruleSets.memberId).toBeDefined();
        expect(ruleSets.memberId.additional1).toBe(1);
        expect(ruleSets.memberId.additional2).toBe(2);
      }));
    });
  });

});
