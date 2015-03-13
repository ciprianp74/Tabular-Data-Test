'use strict';

/**
 */

angular.module('tabularDataTestApp').controller('MainCtrl', function ($scope) {

	$scope.addNewMode = false;
	$scope.user = {childrenNo: 0};
	$scope.maxDOB = new Date();
	$scope.maxDOB.setDate($scope.maxDOB.getDate() - 1);
	$scope.users = [];
	$scope.syncUsers = [];

	$scope.save = function(form) {
		console.log('save=' + form.$valid);
		if(!form.$valid) {return;}
		$scope.syncUsers.unshift(angular.copy($scope.user));
		$scope.users = [].concat($scope.syncUsers);
		$scope.addNewMode = false;
	};

	$scope.reset = function(form) {
		$scope.user = {childrenNo: 0};

		if (form) {
	      form.$setValidity();
		  form.$setPristine(true);
	      form.$setUntouched(true);
		}
	};

	$scope.cancelAdd = function(form) {
		$scope.reset(form);
		$scope.addNewMode = false;
	};

	$scope.initAdd = function(form) {
		form.$setPristine(true);
	    form.$setUntouched(true);
	    $scope.user = {childrenNo: 0};

		$scope.addNewMode = true;
	};
});