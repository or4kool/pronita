pronita.controller('userController', ['$scope','mockService', function($scope,mockService){

	$scope.userDetail = {};

	var loginUrl = "/appActions/userLogin";

	$scope.showVal = function(){

		console.log($scope.userDetail);
	};


	$scope.loginUser = function(){

		var postData = mockService.poster($scope.userDetail, loginUrl)
			.then(function(result){
				console.log(result);
			});

	};
	
		

}]);