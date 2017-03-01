pronita.controller('offerController', ['$scope', function($scope){

	$scope.listProductPopulate = [];
	$scope.listNewProductPopulate = [];
	$scope.listTrendingProductPopulate = [];
	$scope.listProductCounter = 0;
	$scope.trendingProductCounter = 0;
	$scope.newProductCounter = 0;
	$scope.offerLink = {
		all: 1,
		free: 0,
		discounted: 0
	}

	// $scope.all = 
	
	// $scope.topnewHeader = 'top new';


	$scope.listProduct = function(num){

		if ($scope.listProductCounter < 1 ){
			for (var i=0; i < num; i++){
			$scope.listProductPopulate.push(i);
			}
		}
		$scope.listProductCounter = 1;
		return $scope.listProductPopulate;
	}

	$scope.trendingProduct = function(num){

		if ($scope.trendingProductCounter < 1 ){
			for (var i = 0; i < num; i++){
			$scope.listTrendingProductPopulate.push(i);
			}
		}
		$scope.trendingProductCounter = 1;
		return $scope.listTrendingProductPopulate;
	}

	$scope.newProduct = function(num){

		if ($scope.newProductCounter < 1 ){
			for (var i = 0; i < num; i++){
			$scope.listNewProductPopulate.push(i);
			}
		}
		$scope.newProductCounter = 1;
		return $scope.listNewProductPopulate;
	}

	$scope.checkPos = function(pos){
		console.log("Clicked");
		if(pos == 0 && $scope.offerLink.all == 0){
			$scope.offerLink.all = 1;
			$scope.offerLink.free = 0;
			$scope.offerLink.discounted = 0;
		}
		else if(pos == 1 && $scope.offerLink.free == 0){
			$scope.offerLink.free = 1;
			$scope.offerLink.all = 0;
			$scope.offerLink.discounted = 0;
		}
		else{
			$scope.offerLink.discounted = 1;
			$scope.offerLink.all = 0;
			$scope.offerLink.free = 0;
		}
	}

}]);