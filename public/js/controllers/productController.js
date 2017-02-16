pronita.controller('productController', ['$scope','$location', 'mockService', function($scope,$location, mockService){

	$scope.recommendationList = [];
	$scope.recommendationCount = 0;

	$scope.productImg = "img/product-display.png";
	$scope.productName = "Rosaline flower pot";
	$scope.productTestPeriod = "1 month";
	$scope.productDelivery = "1-3 working days";
	$scope.productQunatity = "1";
	$scope.proudctPrice = "28000";
	$scope.discountedPrice = "25000";

	$scope.recommender = function(num){

		if ($scope.recommendationCount < 1){
			for (var i = 0; i < num; i++){
				$scope.recommendationList.push(i);
			}
		}

		$scope.recommendationCount = 1;
		return $scope.recommendationList;
	};

	var tashment = 1;
	var add = 0;


	$scope.addCart = function(){

		
		mockService.productBag.push({productImg:$scope.productName,productName:$scope.productName,productTestPeriod:$scope.productTestPeriod,productDelivery:$scope.productDelivery,productQunatity:$scope.productQunatity,proudctPrice:$scope.proudctPrice,discountedPrice:$scope.discountedPrice});
		console.log(mockService.productBag);

		$location.url("/cart");
	}

	
}]);