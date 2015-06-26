(function(root) {
  'use strict';

  var availity = root.availity;

  var _validate = function(validCombinations, formConfigIdToFieldMap, fieldToValueMap, rule) {
    validCombinations = validCombinations.slice(0);
    var fieldsWithData = {};
    var fieldsInError = {};
    var minCombinationLength = 1000;
    var combinationsToShow = [];
    var valid = false;

    var updateCombinationsToShow = function(combination) {
      if(combination.length === 0) {
        valid = true;
        return;
      } else if(combination.length === minCombinationLength) {
        combinationsToShow.unshift(combination);
      } else if(combination.length < minCombinationLength) {
        minCombinationLength = combination.length;
        combinationsToShow = [combination];
      }
    };

    var updateValidCombination = function(combination, fields) {
      _.forEach(fields, function(field) {
        combination = _.without(combination, field);
      });
      updateCombinationsToShow(combination);
    };

    _.forEach(validCombinations, function(validCombination) {
      _.forEach(validCombination, function(formConfigId) {
        if(fieldToValueMap[formConfigIdToFieldMap[formConfigId].valueId]) {
          fieldsWithData[formConfigId] = true;
        }
      });
    });

    for(var i = 0; i < validCombinations.length && !valid; i++) {
      validCombinations.push(updateValidCombination(validCombinations.shift(), _.keys(fieldsWithData)));
    }
    if(!valid) {
      var message = '<strong>Insufficient information to submit a request. Please fill one of the combinations of fields listed below:</strong><br/><br/><ul>';
      var subMessages = [];
      _.forEach(combinationsToShow, function(combination) {
        var subMessage = '<li>';
        _.forEach(combination, function(fieldId) {
          fieldsInError[formConfigIdToFieldMap[fieldId].valueId] = true;
          subMessage += formConfigIdToFieldMap[fieldId].label + ', ';
        });
        subMessage = subMessage.substring(0, subMessage.length - 2) + '</li>';
        subMessages.unshift(subMessage);
      });
      _.forEach(_.uniq(subMessages), function(subMessage) {
        message += subMessage;
      });
      rule.message = message;
    }

    return {
      valid: valid,
      fieldsInError: _.keys(fieldsInError)
    };
  };

  var getValidator = function(validCombinations, formConfigIdToFieldMap) {
    return {
      name: 'requiredFieldCombinations',
      validate: function (fieldToValueMap, rule) {
        return _validate(validCombinations, formConfigIdToFieldMap, fieldToValueMap, rule);
      }
    };
  };

  availity.core.factory('avValRequiredFieldCombinations', function() {
    function AvVaRequiredFieldCombinations() {}

    AvVaRequiredFieldCombinations.prototype.getValidator = function(validCombinations, formConfigIdToFieldMap) {
      return getValidator(validCombinations, formConfigIdToFieldMap);
    };

    return new AvVaRequiredFieldCombinations();
  });

})(window);
