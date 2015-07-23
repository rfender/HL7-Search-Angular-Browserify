'use strict';

exports.inject = function(app) {
  // require('./../directives/TestDirective').inject(app);
  app.controller('TestCtrl', exports.controller);
  return exports.controller;
};

exports.controller = function($scope, $state) {
  $scope.testvar = 'Aap';

  $scope.start = function() {
    console.log('start()');
    $state.go('viewData');
  };
};
