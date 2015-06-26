/*global inject, expect, jasmine*/
define(function (require) {
  "use strict";
  require('angularMock');
  require('foundation/js/av-core/ui/form-config/form.config.service');
  //var _ = require('underscore');

  describe('Form Config', function () {
    var configurationsResourceMock, $rootScope, $q;

    describe('form config service', function () {

      beforeEach(module('eligibility'));
      beforeEach(module('avCore'));
      beforeEach(function() {
        configurationsResourceMock = {
          all: function() { return {configurations: [{id: 1}]}; }
        };
        module(function($provide) {
          $provide.value("configurationsResource", configurationsResourceMock);
        });
      });
      beforeEach(inject(function(_$rootScope_, _$q_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
      }));

      describe("get request form", function() {
        it("gets default configuration if payer ID not specified", inject(function (formConfigService) {
          spyOn(formConfigService, "_buildRequestForm");
          formConfigService.getRequestForm({id: "2"}, {}, {}, {"270": 1}, "270");
          $rootScope.$apply();
          expect(formConfigService._buildRequestForm).toHaveBeenCalledWith(jasmine.any(Object), {id: "2"}, 1, undefined, undefined, undefined, {});
        }));
        /*it("gets payer configuration if payer ID specified", inject(function (formConfigService) {
          spyOn(formConfigService, "_buildRequestForm");
          formConfigService._getConfiguration = function() { return {then: function(fn){ return fn.apply(formConfigService, [[{id: 1}]]); }}; };
          formConfigService.getRequestForm({id: "2"}, "270", "BCBSF", "1194");
          $rootScope.$apply();
          expect(formConfigService._buildRequestForm).toHaveBeenCalledWith(jasmine.any(Object), {id: "2"}, {id: 1}, undefined, undefined, undefined, {});
        }));*/
      });

      describe("build request form", function() {
        it("creates form element", inject(function (formConfigService) {
          var formTemplate = '<div class="container"><label>Header</label><div data-inject="true"></div></div>';
          var formConfig = {template: formTemplate, containers: [{}]};
          formConfigService._buildElementContainer = function(){ return $('<span class="child"></span>'); };
          var deferred =$q.defer();
          formConfigService._buildRequestForm(deferred, formConfig);
          deferred.promise.then(function(form) {
            var expectedOutcome = '<span class="child"></span>';
            expect(form[0].outerHTML).toBe(expectedOutcome);
          });
        }));
      });

      describe("build element container", function() {
        it("doesn't fail if no elements exist", inject(function(formConfigService) {
          var containerConfig = {template: '<div><div data-inject="true"></div></div>'};
          expect(formConfigService._buildElementContainer(containerConfig)[0].outerHTML).toBe('<div><div data-inject="true"></div></div>');
        }));
        it("appends child containers", inject(function(formConfigService) {
          var containerConfig = {
            template: '<div data-inject="true"></div>',
            elements: {childContainer: {template: '<span data-inject="true"></span>', elements: {}}}
          };
          expect(formConfigService._buildElementContainer(containerConfig, {elements: {}})[0].outerHTML).toBe('<div data-inject="true"><span data-inject="true"></span></div>');
        }));
        it("doesn't fail if element returned is not defined", inject(function(formConfigService) {
          var containerConfig = {
            template: '<div data-inject="true"></div>',
            elements: {memberId: {}}
          };
          formConfigService._buildElement = function(){ return; };
          expect(formConfigService._buildElementContainer(containerConfig, {elements: {}})[0].outerHTML).toBe('<div data-inject="true"></div>');
        }));
        it("appends elements", inject(function(formConfigService) {
          var containerConfig = {
            template: '<div data-inject="true"></div>',
            elements: {memberId: {}}
          };
          formConfigService._buildElement = function(){ return $('<input name="memberId" type="text">'); };
          expect(formConfigService._buildElementContainer(containerConfig, {elements: {}})[0].outerHTML).toBe('<div data-inject="true"><input name="memberId" type="text"></div>');
        }));
      });

      describe("update element model", function() {
        var models;
        beforeEach(function() {
          models = {
            memberId: "abc",
            patientId: "123",
            birthDate: "20150102",
            serviceType: {code: "30", value: "Health Benefit Plan Coverage"}
          };
        });
        it("does nothing if config specifies to ignore default value", inject(function(formConfigService) {
          formConfigService._updateElementModel("memberId", {ignoreDefaultValues: true}, {defaultValue: "hello"}, models);
          expect(models.memberId).toBe("abc");
          expect(models.patientId).toBe("123");
        }));
        it("does nothing if default value undefined and should not set to undefined", inject(function(formConfigService) {
          formConfigService._updateElementModel("memberId", {setAsUndefinedIfNoDefaultValue: false}, {}, models);
          expect(models.memberId).toBe("abc");
          expect(models.patientId).toBe("123");
        }));
        it("does nothing if default value undefined and should not set to undefined", inject(function(formConfigService) {
          formConfigService._updateElementModel("memberId", {existingValuesOverrideDefaultValues: true}, {defaultValue: "hello"}, models);
          expect(models.memberId).toBe("abc");
          expect(models.patientId).toBe("123");
        }));
        it("updates using element ID if model key is not defined", inject(function(formConfigService) {
          formConfigService._updateElementModel("memberId", {}, {defaultValue: "hello"}, models);
          expect(models.memberId).toBe("hello");
          expect(models.patientId).toBe("123");
        }));
        it("updates using model key if model key is defined", inject(function(formConfigService) {
          formConfigService._updateElementModel("memberId", {modelKey: "patientId"}, {defaultValue: "hello"}, models);
          expect(models.memberId).toBe("abc");
          expect(models.patientId).toBe("hello");
        }));
        it("uses MMDDYYYY for date format if one isn't specified", inject(function(formConfigService) {
          formConfigService._updateElementModel("birthDate", {}, {type: "Date", defaultValue: "2014-12-15T12:00:00.000+0000"}, models);
          expect(models.birthDate).toBe("12152014");
        }));
        it("uses specified format for date format if one is specified", inject(function(formConfigService) {
          formConfigService._updateElementModel("birthDate", {dateFormat: "MM-DD-YYYY"}, {type: "Date", defaultValue: "2014-12-15T12:00:00.000+0000"}, models);
          expect(models.birthDate).toBe("12-15-2014");
        }));
        it("sets repeat values for enum types", inject(function(formConfigService) {
          var payerConfig = {
            type: "Enumeration",
            defaultValue: {
              "code": "60",
              "value": "General Benefits"
            },
            values: [
             {
              "code": "60",
              "value": "General Benefits"
              },
              {
                "code": "BT",
                "value": "Gynecological"
              },
              {
                "code": "30",
                "value": "Health Benefit Plan Coverage"
              }
            ]
          };
          formConfigService._updateElementModel("serviceType", {repeatKey: "serviceTypes"}, payerConfig, models);
          expect(models.serviceTypes).toBeDefined();
          expect(models.serviceTypes.length).toBe(3);
        }));
        it("uses 'code' for enum key if one isn't specified", inject(function(formConfigService) {
          var payerConfig = {
            type: "Enumeration",
            defaultValue: {
              "code": "60",
              "value": "General Benefits"
            },
            values: [
             {
              "code": "60",
              "value": "General Benefits"
              },
              {
                "code": "BT",
                "value": "Gynecological"
              },
              {
                "code": "30",
                "value": "Health Benefit Plan Coverage"
              }
            ]
          };
          formConfigService._updateElementModel("serviceType", {repeatKey: "serviceTypes"}, payerConfig, models);
          expect(models.serviceType.code).toBe("60");
        }));
        it("uses specified enum key for enum key if one is specified", inject(function(formConfigService) {
          var payerConfig = {
            type: "Enumeration",
            defaultValue: {
              "id": "60",
              "value": "General Benefits"
            },
            values: [
               {
                "id": "60",
                "value": "General Benefits"
              },
              {
                "id": "BT",
                "value": "Gynecological"
              },
              {
                "id": "30",
                "value": "Health Benefit Plan Coverage"
              }
            ]
          };
          formConfigService._updateElementModel("serviceType", {enumKey: "id", repeatKey: "serviceTypes"}, payerConfig, models);
          expect(models.serviceType.id).toBe("60");
        }));
      });

      describe("update element validation rules", function() {
        var element,baseElementConfig,payerElementConfig,ruleSets,messages;
        beforeEach(function() {
          element = $('<input name="memberId" type="text">');
          baseElementConfig = {};
          payerElementConfig = {};
          ruleSets = {};
          messages = {};
        });

        it("doesn't add new rules if rules set ID not defined", inject(function(formConfigService) {
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.memberId).toBeUndefined();
          expect(messages.memberId).toBeUndefined();
        }));
        it("defines error message from payer config using error message ID", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          payerElementConfig.errorMessage = "You borked it!";
          baseElementConfig.errorMessageId = "myId";
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(messages.myId).toBe("You borked it!");
        }));
        it("defines error message from payer config using element ID if error message ID not specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          payerElementConfig.errorMessage = "You borked it!";
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(messages.memberId).toBe("You borked it!");
        }));
        it("defines rule set using rule set ID when specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "myId";
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.myId).toBeDefined();
        }));
        it("does not add required validator if not specified by payer", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          baseElementConfig.ignoreRequiredFlag = false;
          payerElementConfig.required = false;
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.memberId).toBeDefined();
          expect(ruleSets.memberId.required).toBeUndefined();
        }));
        it("does not add required validator if ignored by base config", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          baseElementConfig.ignoreRequiredFlag = true;
          payerElementConfig.required = true;
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.memberId).toBeDefined();
          expect(ruleSets.memberId.required).toBeUndefined();
        }));
        it("adds required validator when specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          baseElementConfig.ignoreRequiredFlag = false;
          payerElementConfig.required = true;
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.memberId).toBeDefined();
          expect(ruleSets.memberId.required).toBeDefined();
        }));
        it("does not add pattern if not specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.memberId).toBeDefined();
          expect(ruleSets.memberId.regex).toBeUndefined();
        }));
        it("adds pattern when specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          payerElementConfig.pattern = /$\w*^/;
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.memberId).toBeDefined();
          expect(ruleSets.memberId.regex).toBeDefined();
        }));
        it("does not add date validation if none are specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "asOfDate";
          payerElementConfig.type = "Date";
          formConfigService._updateElementValidationRules("asOfDate", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.asOfDate).toBeDefined();
          expect(ruleSets.asOfDate.dateFormat).toBeUndefined();
        }));
        it("adds date format validator", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "asOfDate";
          payerElementConfig.type = "Date";
          baseElementConfig.dateFormat = "MMDDYYYY";
          formConfigService._updateElementValidationRules("asOfDate", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.asOfDate).toBeDefined();
          expect(ruleSets.asOfDate.dateFormat).toBeDefined();
        }));
        it("does not add date range validator if min not specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "asOfDate";
          payerElementConfig.type = "Date";
          payerElementConfig.max = "2099-12-31T23:59:59.999+0000";
          formConfigService._updateElementValidationRules("asOfDate", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.asOfDate).toBeDefined();
          expect(ruleSets.asOfDate.dateRange).toBeUndefined();
        }));
        it("does not add date range validator if max not specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "asOfDate";
          payerElementConfig.type = "Date";
          payerElementConfig.min = "2000-01-01T00:00:00.000+0000";
          formConfigService._updateElementValidationRules("asOfDate", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.asOfDate).toBeDefined();
          expect(ruleSets.asOfDate.dateRange).toBeUndefined();
        }));
        it("adds date range validator if min and max are specified", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "asOfDate";
          payerElementConfig.type = "Date";
          payerElementConfig.min = "2000-01-01T00:00:00.000+0000";
          payerElementConfig.max = "2099-12-31T23:59:59.999+0000";
          baseElementConfig.dateFormat = "MMDDYYYY";
          formConfigService._updateElementValidationRules("asOfDate", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.asOfDate).toBeDefined();
          expect(ruleSets.asOfDate.dateRange).toBeDefined();
        }));
        it("does not add array size validator if enumeration does not allow repeats", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "serviceType";
          payerElementConfig.type = "Enumeration";
          payerElementConfig.repeats = false;
          formConfigService._updateElementValidationRules("serviceType", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.serviceType).toBeDefined();
          expect(ruleSets.serviceType.arraySize).toBeUndefined();
        }));
        it("adds array size validator if enumeration allows repeats", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "serviceType";
          payerElementConfig.type = "Enumeration";
          payerElementConfig.repeats = true;
          payerElementConfig.minRepeats = 1;
          payerElementConfig.maxRepeats = 99;
          formConfigService._updateElementValidationRules("serviceType", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.serviceType).toBeDefined();
          expect(ruleSets.serviceType.arraySize).toBeDefined();
        }));
        it("applies max length property to element if max length defined and element is input", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          payerElementConfig.maxLength = "17";
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(element.attr("maxlength")).toBe("17");
        }));
        it("applies max length property to element's input if max length defined and element is not input", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          payerElementConfig.maxLength = "17";
          element = $('<div><input name="memberId" type="text"></div>');
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(element.find('input').attr("maxlength")).toBe("17");
        }));
        it("applies default max length property to element if max length not defined", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          baseElementConfig.defaults = {maxLength: "17"};
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(element.attr("maxlength")).toBe("17");
        }));
        it("applies additional validators", inject(function(formConfigService) {
          baseElementConfig.ruleSetId = "memberId";
          baseElementConfig.additionalValidators = [1,2];
          formConfigService._updateElementValidationRules("memberId", element, baseElementConfig, payerElementConfig, ruleSets, messages);
          expect(ruleSets.memberId).toBeDefined();
          expect(ruleSets.memberId.additionalValidator0).toBe(1);
          expect(ruleSets.memberId.additionalValidator1).toBe(2);
        }));
      });
    });

  });
});
