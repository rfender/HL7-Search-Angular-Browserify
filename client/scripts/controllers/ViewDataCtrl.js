'use strict';

exports.inject = function(app) {
	app.controller('ViewDataCtrl', exports.controller);
	return exports.controller;
};

exports.controller = function($scope, $state, rawhl7data, hl7Models) {

	$scope.title = 'HL7 Viewer';
	$scope.global = {
    searchValue: ''
  };

  $scope.rawhl7data = [{text:rawhl7data.data}];

	// To reduce $scope soup, let's bind to one object. This also helps
	// in two-way databinding (atleast it did a couple of years ago).
  $scope.records = hl7Models;
	//$scope.record = hl7Models[2];
	
};