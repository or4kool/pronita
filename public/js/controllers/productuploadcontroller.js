pronita.controller('productuploadController', ['$scope','$q','mockService', function($scope,$q,mockService){

	var url = "/appActions/userLogin";
	$scope.productInfo = {};
	$scope.productPrice = {};
	$scope.keyfeat = {};
	$scope.allProductInfo = {};
	

	$scope.triggerUpload = function(){
		console.log($scope.allProductInfo);
		// var toUpload = mockService.poster($scope.productInfo, url);
		
		// toUpload.then(function(result){

		// 	console.log(result);

		// });
	}


	

}]);