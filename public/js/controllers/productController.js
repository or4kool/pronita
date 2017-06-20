pronita.controller('productController', productDetail);


	productDetail.$inject = ['$scope','$location', 'mainService', 'addCart', '$routeParams'];

	function productDetail($scope,$location, mainService, addCart, $routeParams){

		var pc = this;


	pc.recommendationList = [];
	pc.recommendationCount = 0;

	pc.liked = 'fa fa-heart';
	pc.unliked = 'fa fa-heart-o';
	$scope.confirmLike = pc.unliked;

	pc.url = '/appActions/inventory'

	// $scope.selectedproduct = {Rocknrool : 'want one'};

	$scope.isLike = 118;


	// pc.inventory = {
	// 	productImg:"img/product-display.png",
	// 	productName:"Rosaline flower pot",
	// 	productTestPeriod: "1 month",
	// 	productDelivery: "1-3 working days",
	// 	productQunatity: "1",
	// 	proudctPrice: "28000",
	// 	discountedPrice: "25000"
	// }

	$scope.productInfo = {
		keyFeatures: 1,
		specifications: 0,
		offerDetails: 0,
		offerConditions: 0,
		review: 0

	}
	

	$scope.recommender = function(num){

		if (pc.recommendationCount < 1){
			for (var i = 0; i < num; i++){
				pc.recommendationList.push(i);
			}
		}

		pc.recommendationCount = 1;
		return pc.recommendationList;
	};

	var tashment = 1;
	var add = 0;


	$scope.addCarter = function(){

		addCart.addIt();
		// $location.url("/cart");
	}

	$scope.pushToCart = function(){
		
		// CALL SERVICE TO ADD SELECTED PRODUCT TO CART BAG
		addCart.cartDot = 1;
		addCart.addIt();
	}

	// $scope.pushToCart();

	$scope.productLiked = function(){

		if ($scope.confirmLike == pc.unliked){
			$scope.confirmLike = pc.liked;

			//add one to the like array for product
			$scope.isLike += 1;
		}
		else{
			$scope.confirmLike = pc.unliked;
			$scope.isLike -= 1
			//pop one from the like array for product
		}

		return $scope.confirmLike;

	}

	$scope.getSingleProduct = function(url){
		var url = url + '/' + $routeParams.productId;
		console.log(url);
		var productData = mainService.fetchData(url);
		productData.then(function(result){
			$scope.singleProduct = result.data;
			console.log(result);
		})
	}

	$scope.getSingleProduct(pc.url);
	
};