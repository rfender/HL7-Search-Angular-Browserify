'use strict';

exports.inject = function(app) {
  app.directive('patient', exports.directive);
  return exports.directive;
};

exports.directive = function() {
  return {
    restrict: 'E',
    template: '../../templates/directiveTest.html'
  };
};
