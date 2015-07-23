/**
 * This filter runs a comparison on the text using the passed in 'phrase'
 * and each patients property values.
 */

'use strict';

exports.inject = function(app) {
  app.filter('patientHighlight', exports.filter);
  return exports.filter;
};

exports.filter = function($sce) {
  return function(patients, phrase) {
    if (phrase) {
      
      var result = [];
      angular.forEach(patients, function (patient, key) {
        angular.forEach(patient, function (value, key2) {
          if (value === phrase) {
            result.push(patient);
          }
        })
      });
      
      // Return the array of patients that have a property value
      // that matches the search
      return result;
    
    }

    // If no patient is found with that property value, return them all
    return patients;
  };
};