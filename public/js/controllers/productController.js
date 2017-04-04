pronita.controller('productController', productDetail);


	productDetail.$inject = ['$scope','$location', 'mockService', 'addCart'];

	function productDetail($scope,$location, mockService, addCart){

		var pc = this;


	pc.recommendationList = [];
	pc.recommendationCount = 0;

	$scope.selectedproduct = {Rocknrool : 'want one'};


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
		// addCart.addToCart(product);
		addCart.cartDot = 1;
		addCart.addIt();
	}

	// $scope.pushToCart();
	
};