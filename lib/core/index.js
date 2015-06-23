



var originalModule = angular.module;
var modules = [];

angular.module = function(name, deps) {

    if (deps && _.indexOf(modules, name) !== -1) {
        throw new Error('redefining module: ' + name);
    }

    modules.push(name);

    return originalModule(name, deps);
};


require('./api');
require('./analytics');
require('./authorizations');
require('./idle');
require('./logger');
require('./polling');
require('./polling');
require('./session');
require('./utils');
require('./validation');