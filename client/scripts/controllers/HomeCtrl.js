'use strict';

/**
 * This controller works with the home.html view.
 * It doesn't do much other than expose a method
 * to navigate the user to the next page.
 */

exports.inject = function(app) {
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
