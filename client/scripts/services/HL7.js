'use strict';

var hl7 = require('simple-hl7');

exports.inject = function(app) {
  app.factory('HL7', exports.factory);
  return exports.factory;
};

exports.factory = function($http) {

  return {
    load: function() {
      return $http.get('sample.hl7');
    },
    parse: function(data) {
      var parser = new hl7.Parser();
 
      var msg = parser.parse(data.toString());

      return msg;
    }
  };

};