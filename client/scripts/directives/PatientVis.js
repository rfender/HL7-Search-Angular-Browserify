'use strict';

/**
 * This directive takes the data from the patient renderModel
 * and uses it to render some visualizations.
 */

exports.inject = function(app) {
	app.directive('patientVis', exports.directive);
	return exports.directive;
};

exports.directive = function() {
	return {
		restrict: 'E',
    replace: true,
    templateUrl: '../views/patientVis.html',
    link: function(scope, element, attrs, ctrl) {
    	console.log('here -------');
    }
	}
};