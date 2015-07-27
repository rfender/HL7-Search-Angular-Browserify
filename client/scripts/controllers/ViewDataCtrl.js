'use strict';

/**
 * This controller is implemented by the viewData.html view.
 */

exports.inject = function(app) {
	app.controller('ViewDataCtrl', exports.controller);
	return exports.controller;
};

exports.controller = function($scope, $state, rawhl7data, hl7Models) {

	$scope.title = 'HL7 Viewer';
	$scope.showRawHL7 = false;
	$scope.viewRawBtnLabel = ($scope.showRawHL7) ? 'Hide raw HL7' : 'Show raw HL7';
	$scope.global = {
    searchValue: ''
  };

  $scope.rawhl7data = [{text:rawhl7data.data}];

	// To reduce $scope soup, let's bind to one object. This also helps
	// in two-way databinding (atleast it did a couple of years ago).
  $scope.records = hl7Models;
	
	/**
	 * This method handles showing or hiding the raw HL7 data
	 * and changing the state of the button label
	 */
	var showRawFlag = false;
	$scope.showHideRawHL7 = function() {
		this.showRawHL7 = !this.showRawHL7;

		this.viewRawBtnLabel = (this.showRawHL7) ? 'Hide raw HL7' : 'Show raw HL7';

	}
	
};