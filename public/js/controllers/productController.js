pronita.controller('productController', productDetail);


	productDetail.$inject = ['$scope','$location', 'mockService'];

	function productDetail($scope,$location, mockService){

		var pc = this;


	pc.recommendationList = [];
	pc.recommendationCount = 0;

	pc.inventory = {
		productImg:"img/product-display.png",
		productName:"Rosaline flower pot",
		productTestPeriod: "1 month",
		productDelivery: "1-3 working days",
		productQunatity: "1",
		proudctPrice: "28000",
		discountedPrice: "25000"
	}

	$scope.keyFeatures = 1;
	$scope.specifications = 0;
	$scope.offerDetails = 0;
	$scope.offerConditions = 0;
	$scope.review = 0;

	$scope.link = function (loc){
			

			if (loc == 0){
					$scope.keyFeatures = 1;
					$scope.specifications = 0;
					$scope.offerDetails = 0;
					$scope.offerConditions = 0;
					$scope.reviews = 0;
			}
			else if (loc == 1){
				$scope.keyFeatures = 0;
				$scope.specifications = 1;
				$scope.offerDetails = 0;
				$scope.offerConditions = 0;
				$scope.reviews = 0;
			}
			else if (loc == 2){
				$scope.keyFeatures = 0;
				$scope.specifications = 0;
				$scope.offerDetails = 1;
				$scope.offerConditions = 0;
				$scope.reviews = 0;
			}else if(loc ==3){
				$scope.keyFeatures = 0;
				$scope.specifications = 0;
				$scope.offerDetails = 0;
				$scope.offerConditions = 1;
				$scope.reviews = 0;
			}else{
				$scope.keyFeatures = 0;
				$scope.specifications = 0;
				$scope.offerDetails = 0;
				$scope.offerConditions = 0;
				$scope.reviews = 1;
			}

			// return productDetailLinks;
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


	$scope.addCart = function(){

		
		mockService.productBag.push({
			productImg:pc.inventory.productName,
			productName:pc.inventory.productName,
			productTestPeriod:pc.inventory.productTestPeriod,
			productDelivery:pc.inventory.productDelivery,
			productQunatity:pc.inventory.productQunatity,
			proudctPrice:pc.inventory.proudctPrice,
			discountedPrice:pc.inventory.discountedPrice
		});
		console.log(mockService.productBag);

		$location.url("/cart");
	}

	
};