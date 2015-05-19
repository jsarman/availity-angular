/*global availity:true, window:false, angular*/
var availity = window.availity || {};

(function() {
  'use strict';

  availity.demo = angular.module('availity.demo', [
    'ui.router',
    'availity',
    'availity.ui',
    'availity.ui.templates'
  ]);

  availity.demo.controller('PageController', function() {
  });

  availity.demo.controller('WizardController', function(){

  });

  availity.demo.config(function(avIdleProvider, $stateProvider, $urlRouterProvider) {
    avIdleProvider.enable(false);

    //debugger;

    $urlRouterProvider.otherwise('/Wizard-1');

    $stateProvider
      .state('Wizard-1', {
        url: '/Wizard-1',
        templateUrl: 'templates/wizard-1-template.html'
      })
      .state('Wizard-2', {
        url: '/Wizard-2',
        templateUrl: 'templates/wizard-2-template.html'
      })
      .state('Wizard-3', {
        url: '/Wizard-3',
        templateUrl: 'templates/wizard-3-template.html'
      });
  });

})();
