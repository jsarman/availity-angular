(function(root) {

  'use strict';

  var availity = root.availity;

  availity.demo.controller('TypeaheadController', function($scope) {
    $scope.taxIds = [
      {taxid: '123456789', firstName: 'James', lastNamer: 'Smith'},
      {taxid: '123456780', firstName: 'James', lastNamer: 'Smith'},
      {taxid: '123456781', firstName: 'James', lastNamer: 'Smith'},
      {taxid: '123456782', firstName: 'James', lastNamer: 'Smith'},
      {taxid: '123456783', firstName: 'James', lastNamer: 'Smith'}
    ];
    $scope.demoTemplate = '<p>{{#if businessName}} {{businessName}}  {{else}}{{firstName}} {{lastName}}{{/if}} <span class="bullet">&bull;</span> {{taxid}}</p>';
  });

})(window);
