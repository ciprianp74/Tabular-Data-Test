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

	$scope.user1 = {name: 'aaa', email: 'ppp', childrenNo: 0, dob: new Date()};
	$scope.user2 = {name: 'bbb', email: 'zzz', childrenNo: 0, dob: new Date()};
	$scope.syncUsers.push($scope.user1);
	$scope.syncUsers.push($scope.user2);
	$scope.users = [].concat($scope.syncUsers);
	

	$scope.save = function(valid) {
		console.log('SAVE');
		if(!valid) {return;}
		$scope.syncUsers.unshift(angular.copy($scope.user));
		$scope.users = [].concat($scope.syncUsers);
		$scope.addNewMode = false;
	};
	  
	$scope.reset = function(form) {
		$scope.user = {childrenNo: 0};
		

		if (form) {
	      form.$setValidity();
		  form.$setPristine();
	      form.$setUntouched();
		}	    
	};

	$scope.cancelAdd = function(form) {
		$scope.reset(form);
		$scope.addNewMode = !$scope.addNewMode;
	};
});