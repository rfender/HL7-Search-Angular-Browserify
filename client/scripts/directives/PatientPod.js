/**
 * This is an element directive that componentizes the form that holds
 * the individual patient model data.
 *
 * Scope is bound to the view's controller that it is included in. This is not
 * optimal for an application in scale but tightly coupling a component to one
 * view/controller with known bindings ... well it's good to go.
 */
'use strict';

exports.inject = function(app) {
  app.directive('patient', exports.directive);
  return exports.directive;
};

exports.directive = function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../views/patient.html',
    link: function(scope, element, attrs, ctrl) {
      console.log(element);
    }
  };
};
