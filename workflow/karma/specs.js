require('angular');
require('angular-mocks');

var context = require.context('../../lib', true, /-spec$/);
context.keys().forEach(context);
