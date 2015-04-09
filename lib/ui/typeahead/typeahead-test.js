(function(root) {

  'use strict';

  var availity = root.availity;


  availity.ui.controller('AvTypeaheadController', function($element, $attrs, AV_UI, $log, $scope, $timeout, $parse) {
    console.log('name', 'value');
    var self = this;

    $scope.data = {
      'Provider1': '123456789',
      'Provider2':'111111111',
      'Provider3':'222222222'
    };
   
    $scope.name = ''; // This will hold the selected item
    $scope.onItemSelected = function() { // this gets executed when an item is selected
      console.log('selected=' + $scope.name);
    };

  });

  availity.ui.directive('avTypeahead', function($timeout, $log, $window, avTemplateCache) {
    return {
      restrict: 'A',
      require: ['ngModel', 'avTypeahead'],
      scope: {
        items: '=',
        prompt: '@',
        title: '@',
        subtitle: '@',
        model: '=',
        onSelect: '@'
      },
      controller: 'AvTypeaheadController',
      link: function(scope, elem, attrs) {
        scope.getContentUrl = function(){
           return 'ui/typeahead/typeahead-tpl.html';
        };
        scope.handleSelection = function(selectedItem) {
          scope.model = selectedItem;
          scope.current = 0;
          scope.selected = true;
          $timeout(function() {
            scope.onSelect();
          }, 200);
        };
        scope.current = 0;
        scope.selected = true; // hides the list initially
        scope.isCurrent = function(index) {
          return scope.current == index;
        };
        scope.setCurrent = function(index) {
          scope.current = index;
        };
      },
      template: '<h1>Good</h1><div ng-include="getContentUrl()"></div>'
    };
  });

})(window);
