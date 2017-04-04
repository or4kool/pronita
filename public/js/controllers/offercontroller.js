pronita.controller('offerController', offerDetails);

	offerDetails.$inject = ['$scope', 'getproduct', '$filter'];

	function offerDetails($scope,getproduct,$filter){


	var oc = this;


	oc.url = "../../data.json";
	

	$scope.listProductPopulate = [];
	$scope.listNewProductPopulate = [];
	$scope.listTrendingProductPopulate = [];
	$scope.listProductCounter = 0;
	$scope.trendingProductCounter = 0;
	$scope.newProductCounter = 0;
	$scope.offerLink = {
		trending: 1,
		free: 0,
		discounted: 0
	}

	$scope.filt = "top trending";

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

	$scope.checkPos = function(pos, filter){
		console.log("Clicked");
		if(pos == 0 && $scope.offerLink.trending == 0){
			$scope.offerLink.trending = 1;
			$scope.offerLink.free = 0;
			$scope.offerLink.discounted = 0;
			$scope.filt = 'top ' + filter;
			console.log($scope.filt);
		}
		else if(pos == 1 && $scope.offerLink.free == 0){
			$scope.offerLink.free = 1;
			$scope.offerLink.trending = 0;
			$scope.offerLink.discounted = 0;
			$scope.filt = 'top ' +  filter;
			console.log($scope.filt);
		}
		else{
			$scope.offerLink.discounted = 1;
			$scope.offerLink.trending = 0;
			$scope.offerLink.free = 0;
			$scope.filt = 'top ' + filter;
			console.log($scope.filt);
		}
	}


	var pd = getproduct.getAllProduct(oc.url);

	pd.then(function(result){
		// console.log($filter('dataFetcher')('top free'));
		
		$scope.productData = result;
	});
	
	  

};