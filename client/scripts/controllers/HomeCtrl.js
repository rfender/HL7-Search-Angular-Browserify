'use strict';

exports.inject = function(app) {
  // require('./../directives/TestDirective').inject(app);
  app.controller('TestCtrl', exports.controller);
  return exports.controller;
};

exports.controller = function($scope, $state, HL7Service) {
  $scope.testvar = 'Aap';

  /**
   * This just takes the user to the next page. Ziiing.
   */
  $scope.start = function() {
    console.log('start()');
    $state.go('viewData');
  };

};
