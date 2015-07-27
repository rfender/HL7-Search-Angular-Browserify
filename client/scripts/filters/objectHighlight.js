/**
 * This filter runs a comparison on the text using the passed in 'phrase'
 * and each patients property values.
 */

'use strict';

exports.inject = function(app) {
  app.filter('patientHighlight', exports.patientComponentFilter);
  return exports.filter;
};

exports.patientPropertyFilter = function() {
  return function(patients, phrase) {
    if (phrase) {

      angular.forEach(patients, function (patient, key) {
        angular.forEach(patient, function (value, key2) {
          value = value.replace(new RegExp('('+phrase+')', 'gi'), '<span class="highlight">$1</span>');
          return value;
        })
      });
    
    }

  };

};