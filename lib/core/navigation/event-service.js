(function(root) {
  'use strict';

  var availity = root.availity;

  var NavigationEventService = function() {

    var EventService = function() {};

    var proto = EventService.prototype;

    proto.triggerEvent = function (eventName, targetWindow) {
      targetWindow.postMessage(eventName, this._getDomain(root));
    };

    proto._getDomain = function(w) {
      if(!w.location.origin) {
        if(w.location.hostname) {
          w.location.origin = w.location.protocol + '//' + w.location.hostname + (w.location.port ? ':' + w.location.port : '');
        } else {
          return null;
        }
      }
      return w.location.origin;
    };

    return new EventService();
  };

  availity.core.factory('navigationEventService', NavigationEventService);

})(window);
