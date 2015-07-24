'use strict';

require('angular');

var uiRoute = require('angular-ui-router');
var app = angular.module('Hl7App', [uiRoute]);

require('bootstrap');
require('./services/HL7').inject(app);
require('./directives/PatientPod').inject(app);
require('./directives/PatientVis').inject(app);
require('./filters/objectHighlight').inject(app);
require('./filters/textHighlight').inject(app);

app.config(function($locationProvider, $stateProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider

  // Home screen. Useless other than to show an example of routing. Wow.
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: require('./controllers/HomeCtrl').inject(app)
  })

  // This state requires retrieval of the HL7 records and conversion to a
  // readable state before we display them on screen.
  .state('viewData', {
    url: '/second-page',
    controller: require('./controllers/ViewDataCtrl').inject(app),
    templateUrl: 'views/viewData.html',
    resolve: {
      rawhl7data: function(HL7Service) {
        return HL7Service.load();
      },
      hl7: function(HL7Service, rawhl7data) {
        return HL7Service.parse(rawhl7data);
      },
      hl7Models: function(HL7Service, hl7) {
        return HL7Service.convertToModels(hl7);
      }
    }
  });

});

app.run();
