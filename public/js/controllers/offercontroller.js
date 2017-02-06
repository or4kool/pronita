pronita.controller('offerController', ['$scope', function($scope){

	$scope.listProductPopulate = [];
	$scope.listNewProductPopulate = [];
	$scope.listTrendingProductPopulate = [];
	$scope.listProductCounter = 0;
	$scope.trendingProductCounter = 0;
	$scope.newProductCounter = 0;
	
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

}]);