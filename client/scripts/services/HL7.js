'use strict';

var hl7 = require('simple-hl7');

exports.inject = function(app) {
  app.factory('HL7Service', exports.factory);
  return exports.factory;
};

exports.factory = function($http) {

  return {
    load: function() {
      // Return a promise to be handled elsewhere
      return $http.post('/api/hl7');
    },
    parse: function(data) {
      // Use the hl7 library's Parser module to parse the hl7
      var parser = new hl7.Parser();

      var msg = parser.parse(data.data.toString())
      return msg;
    },

    /**
     * This method takes the hl7 message and transforms it into an object
     */
    convertToModels: function(records) {
      var models = [];
      // Traversing the segment like this is ugly, but without having a proper
      // HL7 parser, not sure at this time what a better solution might be.
      for (var i = 0; i < records.length; i++) {
        var model = {};
        model.pid = records[i].getSegment("PID").fields[2].value[0][0].value[0][0];
        model.lastName = records[i].getSegment("PID").fields[4].value[0][0].value[0][0];
        model.firstName = records[i].getSegment("PID").fields[4].value[0][1].value[0][0];
        model.middle = records[i].getSegment("PID").fields[4].value[0][2].value[0][0];
        model.testType = records[i].getSegment("OBR").fields[3].value[0][1].value[0][0];
        var segments = records[i].getSegments("OBX");
        model.hdlCholesterol = segments[0].fields[5].value[0][0].value[0][0] + ' ' +  segments[0].fields[5].value[0][1].value[0][0];
        model.triglycerides = segments[1].fields[5].value[0][0].value[0][0] + ' ' +  segments[1].fields[5].value[0][1].value[0][0];
        model.vldl = segments[2].fields[5].value[0][0].value[0][0] + ' ' +  segments[2].fields[5].value[0][1].value[0][0];
        model.ldl = segments[3].fields[5].value[0][0].value[0][0] + ' ' +  segments[3].fields[5].value[0][1].value[0][0];
        model.cholesterol = segments[4].fields[5].value[0][0].value[0][0] + ' ' +  segments[4].fields[5].value[0][1].value[0][0];

        models.push(model);
      }
      return models;
    }
  };

};