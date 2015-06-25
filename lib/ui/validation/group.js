(function(root) {

  'use strict';

  var availity = root.availity;

  availity.ui.directive('avValGroup', function($log, $timeout, avVal, avValAdapter, AV_VAL) {
    return {
      restrict: 'A',
      controller: 'AvValFieldController',
      require: ['^avValForm', '?ngModel', 'avValGroup'],
      scope: {
        avValDebounce: '@?',
        avValOn: '@?'
      },
      link: function(scope, element, attrs, controllers) {

        var rule = attrs.avValGroup; // not always string?
        var avValForm = controllers[0];
        var ngModel = controllers[1];
        var avValGroup = controllers[2];

        if(!ngModel || !rule) {
          $log.error('avValGroup requires ngModel and a validation rule to run.');
          return;
        }

        var groupedFields = [].slice.call(element[0].querySelectorAll('[name]'), 0);
        var fields = [];
        _.forEach(groupedFields, function(field) {
          field = angular.element(field);
          fields.push({
            id: field.attr('name'),
            controller: field.controller('ngModel')
          });
        });

        avValGroup.setNgModel(ngModel);
        avValGroup.avValForm(avValForm);
        avValGroup.setRule(rule);
        avValGroup.createId();
        avValGroup.isGroup = true;

        var buildModel = function() {
          var models = {};
          _.forEach(fields, function(field) {
            models[field.id] = field.controller.$viewValue;
          });
          return models;
        };

        /*scope.$on(AV_VAL.EVENTS.REVALIDATE, function() {
          debugger;
        });*/

        scope.$on(AV_VAL.EVENTS.SUBMITTED, function() {
          ngModel.$dirty = true;
          ngModel.$setViewValue(buildModel());
          avValGroup.validate(ngModel.$viewValue);
        });

        scope.$on('$destroy', function () {
          avValForm.unrecord(ngModel.avId);
        });

      }
    };
  });


})(window);
