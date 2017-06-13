pronita.controller('userController', ['$scope','mainService', function($scope,mainService){

	$scope.userDetail = {};

	var loginUrl = "/appActions/userLogin";

	var showVal = function(){

		console.log($scope.userDetail);
	};

	


	$scope.loginUser = function(){

		var postData = mainService.poster($scope.userDetail, loginUrl)
			.then(function(result){
				console.log(result);
			});

	};

	showVal();
	
		

}]);