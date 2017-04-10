pronita.controller('cartController',cartControllerDetails);

	cartControllerDetails.$inject = ['$scope','$location','addCart'];

	function cartControllerDetails($scope,$location,addCart){

		$scope.shoppingCart = 1;
		$scope.signin = 0;
		$scope.shippingDetail = 0;
		$scope.payment  = 0;
		$scope.currentCartPos = 0;
		$scope.on = 1;
		$scope.off = 0;
		$scope.bar = 1;
		$scope.noAccount = false;

		// $scope.selectedProduct = [{}];

		$scope.shoppingCartOn = function(){
			$scope.payment = $scope.off;
			$scope.signin = $scope.off;
			$scope.shippingDetail = $scope.off;

			if ($scope.shoppingCart == $scope.off){
				return $scope.shoppingCart = $scope.on;	
			}		
		};

		$scope.signinOn = function(){
			$scope.shoppingCart = $scope.off;
			$scope.payment = $scope.off;
			$scope.shippingDetail = $scope.off;

			return $scope.signin = $scope.on;

		};

		$scope.shippingDetailOn = function(){
			$scope.shoppingCart = $scope.off;
			$scope.signin = $scope.off;
			$scope.payment = $scope.off;

			return $scope.shippingDetail = $scope.on;

		};

		$scope.paymentOn = function(){
			$scope.shoppingCart = $scope.off;
			$scope.signin = $scope.off;
			$scope.shippingDetail = $scope.off;

			return $scope.payment = $scope.on;

		};



		$scope.selectedProduct = function(){

			if (addCart.productBag.length > 0){
				console.log(addCart.productBag);
				if (addCart.productBag.productName){

				}
				return addCart.productBag;
			}

			
			// return [{productImg:"img/product-display.png", productName: "Rosaline flower pot", productTestPeriod: "1 month", productDelivery: "1-3 working days", productQunatity: "1", proudctPrice: "28000", discountedPrice: "25000"},
			// {productImg:"img/product-display.png", productName: "correct Flower pot", productTestPeriod: "1 month", productDelivery: "1-3 working days", productQunatity: "1", proudctPrice: "25000", discountedPrice: "25000"}];
		
		}

		$scope.closeOrder = function(index){
			console.log(index);
			addCart.productBag.pop(index);
		}

		$scope.moreQuantity = function(){
			addCart.productBag[0].productQunatity += 1;
		}

		$scope.lessQuantity = function(){

			if (addCart.productBag[0].productQunatity > 1){
				addCart.productBag[0].productQunatity -= 1;
			}
		}

	}

