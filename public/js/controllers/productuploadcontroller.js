pronita.controller('productuploadController', ['$scope','$q','mockService', function($scope,$q,mockService){

	var url = "/appActions/userLogin";
	$scope.productInfo = {};
	$scope.productPrice = {};
	$scope.keyfeat = {};
	$scope.allProductInfo = {};


	$scope.triggerUpload = function(){
		// console.log($scope.allProductInfo);
		data={
			title:'This is the product title',
			description:'This is the product description',
			others:{
				keyFeatures:{
					title:'The latest keyFeatures',
					description:'The description of your our key feature'
				},
				specification:{
					title:'The latest specification',
					description:'The description of your our specification'
				},
				offerDetails:{
					title:'The latest offerDetails',
					description:'The description of your our offerDetails'
				}
			}

		};
		url="/appActions/inventory";
		var toUpload = mockService.poster(data, url);

		toUpload.then(function(result){

			console.log(result);

		});
	}




}]);
