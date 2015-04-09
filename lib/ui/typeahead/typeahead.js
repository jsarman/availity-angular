(function(root) {

  'use strict';
  
  var availity = root.availity;

  // require('typeahead');
  // var Handlebars = require('Handlebars');
  // var Bloodhound = require('typeahead');

  availity.ui.constant('AV_TYPEAHEAD', {
    selected: 'typeahead:selected',
    completed: 'typeahead:autocompleted',
    opened: 'typeahead:opened',
    closed: 'typeahead:closed',
    cursor: 'typeahead:cursorchanged',
    defaultOptions: {
      hint: true,
      highlight: true,
      minLength: 0
    }
  });

  /**
   * [description]
   * @param {object} options https://github.com/twitter/typeahead.js/blob/cc561bf1c6720e6664464fa065105143523c7e78/doc/jquery_typeahead.md#options
   * @param {object} dataSet https://github.com/twitter/typeahead.js/blob/cc561bf1c6720e6664464fa065105143523c7e78/doc/jquery_typeahead.md#datasets
   */
  availity.ui.directive('avTypeahead', function (AV_TYPEAHEAD) {
    return {
      restrict: 'A',
      require: '?ngModel',
      controller: function($scope, $element, AV_TYPEAHEAD) {
        this.initialize = function(searchDatasets) {
          var options = _.extend({}, AV_TYPEAHEAD.defaultOptions);
          var datasets = searchDatasets;
          $element.typeahead(options, datasets);
        };

      },
      link: function(scope, element, attrs, ngModel) {

        ngModel.$parsers.push(function(fromView) {
          if(_.isObject(fromView) && attrs.searchProperty) {
            console.log('---------fromView1', fromView);
            return fromView[attrs.searchProperty];
          }else {
            console.log('---------fromView2', fromView);
            return fromView;
          }
        });

        function updateScope (object, suggestion) {
          scope.$apply(function () {
            ngModel.$setViewValue(suggestion);
          });
        }

        // Update the value binding when a value is manually selected from the dropdown.
        element.bind(AV_TYPEAHEAD.selected, function(object, suggestion, dataset) {
          updateScope(object, suggestion, dataset);
          scope.$emit(AV_TYPEAHEAD.selected, suggestion, dataset);
        });

        // Update the value binding when a query is autocompleted.
        element.bind(AV_TYPEAHEAD.completed, function(object, suggestion, dataset) {
          updateScope(object, suggestion, dataset);
          scope.$emit(AV_TYPEAHEAD.completed, suggestion, dataset);
        });

        // Propagate the opened event
        element.bind(AV_TYPEAHEAD.opened, function() {
          scope.$emit(AV_TYPEAHEAD.opened);
        });

        // Propagate the closed event
        element.bind(AV_TYPEAHEAD.closed, function() {
          scope.$emit(AV_TYPEAHEAD.closed);
        });

        // Propagate the cursorchanged event
        element.bind(AV_TYPEAHEAD.cursor, function(event, suggestion, dataset) {
          scope.$emit(AV_TYPEAHEAD.cursor, event, suggestion, dataset);
        });

        scope.$on('$destroy', function () {
          element.typeahead('destroy');
        });

      }
    };
  });

  availity.ui.directive('avTypeaheadProviders', function () {
    return {
      restrict: 'A',
      require: 'avTypeahead',
      link: function(scope, element, attrs, avTypeaheadCtrl) {

        // scope.searchProviders().then(function(_providers) {

        //   var options = new Bloodhound({
        //     datumTokenizer: function(provider) {
        //       return Bloodhound.tokenizers.whitespace(provider.npi + ' ' + provider.firstName + ' ' +provider.lastName);
        //     },
        //     queryTokenizer: Bloodhound.tokenizers.whitespace,
        //     local: _providers
        //   });

        //   options.initialize();

        //   var dataSets = {
        //     name: 'av-search-providers',
        //     displayKey: 'npi',
        //     source: options.ttAdapter(),
        //     templates: {
        //       suggestion: Handlebars.compile(
        //         '<p>{{#if businessName}} {{businessName}}  {{else}}{{firstName}} {{lastName}}{{/if}} <span class="bullet">&bull;</span> {{npi}}</p>'
        //       )
        //     }
        //   };

        //   avTypeaheadCtrl.initialize(dataSets);

        // });

      }
    };

  });

})(window);
