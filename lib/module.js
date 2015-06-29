var angular = require('angular');
require('angular-sanitize');

var availity = availity || {};
availity.VERSION = 'v0.0.0';
availity.MODULE = 'availity';
availity.core = angular.module(availity.MODULE, ['ng']);

availity.MODULE_UI = 'availity.ui';
availity.ui = angular.module(availity.MODULE_UI, ['ng', 'ngSanitize']);

availity.ui.constant('AV_UI', {
  // jscs: disable
  NG_OPTIONS: /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/
  // jscs: enable
});

module.exports = availity;
