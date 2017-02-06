pronita.controller('productuploadController', ['$scope','$http','mockService' function($scope,$http,mockService){

	var url = "/appActions/userLogin";
	$scope.uploadfile = {};


	$scope.toUpload = mockService.poster()
		.then(fucntion(result){

			console.log(result);

		});

}]);