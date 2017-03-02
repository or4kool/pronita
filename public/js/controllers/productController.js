pronita.controller('productController', productDetail);


	productDetail.$inject = ['$scope','$location', 'mockService'];

	function productDetail($scope,$location, mockService){

		var pc = this;


	pc.recommendationList = [];
	pc.recommendationCount = 0;

	$scope.inventory = {
		productImg:"img/product-display.png",
		productName:"Rosaline flower pot",
		productTestPeriod: "1 month",
		productDelivery: "1-3 working days",
		productQunatity: "1",
		proudctPrice: "28000",
		discountedPrice: "25000"
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
			productImg:$scope.inventory.productName,
			productName:$scope.inventory.productName,
			productTestPeriod:$scope.inventory.productTestPeriod,
			productDelivery:$scope.inventory.productDelivery,
			productQunatity:$scope.inventory.productQunatity,
			proudctPrice:$scope.inventory.proudctPrice,
			discountedPrice:$scope.inventory.discountedPrice
		});
		console.log(mockService.productBag);

		$location.url("/cart");
	}

	
};