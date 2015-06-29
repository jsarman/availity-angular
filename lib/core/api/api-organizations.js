
'use strict';
var availity = require('../../module');
var angular = require('angular');

var OrganizationResourceFactory = function(AvApiResource) {

  var OrganizationResource = function() {
    AvApiResource.call(this, 'organizations');
  };

  angular.extend(OrganizationResource.prototype, AvApiResource.prototype, {

    getOrganizations: function() {
      return this.query().then(function(response) {
        return response.data.organizations ? response.data.organizations : response.data;
      });
    }

  });

  return new OrganizationResource();
};

availity.core.factory('avOrganizationsResource', OrganizationResourceFactory);
