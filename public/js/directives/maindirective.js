pronita.directive('belowFootie', function(){
	// Runs during compile
	return {
		restric: 'E',
		templateUrl: '../view/foot.html',
		replace: true
	};
});

pronita.directive('singleProduct', function(){
	// Runs during compile
	return {
		restric: 'E',
		templateUrl: '../view/productdisplay.html',
		replace: true,
		scope: {
			productDetail: "&",
			productData: "="
		}
	};
});

pronita.directive('getApp', function(){
	// Runs during compile
	return {
		restric: 'E',
		templateUrl: '../view/apparea.html',
		replace: true,
		scope: {}
	};
});

pronita.directive('shoppingCart', function(){
	// Runs during compile
	return {
		restric: 'E',
		templateUrl: '../view/shopcart.html',
		replace: true,
		scope: {
			productName: "&",
			buttonClose: "&"
		}

		// link: function($scope, element, attrs){

		// 	var coh = $scope;
		// 	console.log(coh.selectedProduct[0].productImg);
		// }

		
	};
});

pronita.directive('shoppingSign', function(){

	return {
		restric: 'E',
		templateUrl: '../view/shopsign.html',
		replace: true,
		scope: {
			
		}
	};

});

pronita.directive('shippingDetails', function(){

	return{
		restric: 'E',
		templateUrl: '../view/shipping.html',
		replace: true,
		scope: {

		}

	};

});

pronita.directive('paymentMethod', function(){

	return {
		restric: 'E',
		templateUrl: '../view/payment.html',
		replace: true,
		scope: {

		}

	};

});

pronita.directive('headie', function(){

	return{
		restric: 'E',
		templateUrl: '../view/header.html',
		replace: true,
		scope: {

		}
	}

});

pronita.directive('popUp', function(){

	return{
		restirc: 'E',
		templateUrl: '../view/loginpopup.html',
		replace: true,
		scope:{
			
		}
	}
});

pronita.directive('linker', function(){

	this.handleLink = function(scope, element, attr){
		element.bind('click', function(){
			
			if (attr.loc == 0){
				scope.productInfo.keyFeatures = 1;
				scope.productInfo.specifications = 0;
				scope.productInfo.offerDetails = 0;
				scope.productInfo.offerConditions = 0;
				scope.productInfo.reviews = 0;
			}
			else if (attr.loc == 1){
				scope.productInfo.keyFeatures = 0;
				scope.productInfo.specifications = 1;
				scope.productInfo.offerDetails = 0;
				scope.productInfo.offerConditions = 0;
				scope.productInfo.reviews = 0;
			}
			else if (attr.loc == 2){
				scope.productInfo.keyFeatures = 0;
				scope.productInfo.specifications = 0;
				scope.productInfo.offerDetails = 1;
				scope.productInfo.offerConditions = 0;
				scope.productInfo.reviews = 0;
			}else if(attr.loc ==3){
				scope.productInfo.keyFeatures = 0;
				scope.productInfo.specifications = 0;
				scope.productInfo.offerDetails = 0;
				scope.productInfo.offerConditions = 1;
				scope.productInfo.reviews = 0;
			}else{
				scope.productInfo.keyFeatures = 0;
				scope.productInfo.specifications = 0;
				scope.productInfo.offerDetails = 0;
				scope.productInfo.offerConditions = 0;
				scope.productInfo.reviews = 1;
			}

			scope.$apply("productInfo");


		})
	}

	return {
		restric: 'A',
		link: handleLink
	}
});
