pronita.controller('cartController',cartControllerDetails);

	cartControllerDetails.$inject = ['$scope','$location','addCart', 'mainService'];

	function cartControllerDetails($scope,$location,addCart, mainService){

		var cc = this;

		$scope.shoppingCart = 1;
		$scope.signin = 0;
		$scope.shippingDetail = 0;
		$scope.payment  = 0;
		$scope.currentCartPos = 0;
		$scope.on = 1;
		$scope.off = 0;
		$scope.bar = 1;
		$scope.noAccount = false;
		$scope.totalPrice = 0;
		cc.getBase = 0;

		// $scope.selectedProduct = [{}];


		// SHIPPING TAB
		$scope.shoppingCartOn = function(){
			$scope.payment = $scope.off;
			$scope.signin = $scope.off;
			$scope.shippingDetail = $scope.off;

			if ($scope.shoppingCart == $scope.off){
				return $scope.shoppingCart = $scope.on;	
			}		
		};

		// SIGIN TAB
		$scope.signinOn = function(){
			$scope.shoppingCart = $scope.off;
			$scope.payment = $scope.off;
			$scope.shippingDetail = $scope.off;

			return $scope.signin = $scope.on;

		};

		// SHIPPING DETAILS TAB
		$scope.shippingDetailOn = function(){
			$scope.shoppingCart = $scope.off;
			$scope.signin = $scope.off;
			$scope.payment = $scope.off;

			return $scope.shippingDetail = $scope.on;

		};

		// PAYMENT TAB
		$scope.paymentOn = function(){
			$scope.shoppingCart = $scope.off;
			$scope.signin = $scope.off;
			$scope.shippingDetail = $scope.off;

			return $scope.payment = $scope.on;

		};



		// $scope.selectedProduct = function(){

		// 	if (addCart.productBag.length > 0){
		// 		console.log(addCart.productBag);
		// 		if (addCart.productBag.productName){

		// 		}
		// 		return addCart.productBag;
		// 	}

		
		// }


		$scope.selectedProduct = function(){

			if (mainService.productBag.length > 0){
				if (mainService.productBag.productName){

				}
				return mainService.productBag;
			}

		}

		$scope.closeOrder = function(index){
			console.log(mainService.productBag)
			console.log(index);
			mainService.productBag.splice(index,1);

			// ADD THE TOTAL OF PRODUCTS LEFT AFTER RESETING TOTAL
			$scope.totalPrice = 0;
			$scope.productTotal();
		}


		$scope.moreQuantity = function(index){

			if (!cc.getBase || !mainService.productBag[index].basePrice){
				mainService.productBag[index].basePrice = mainService.productBag[index].price;
				cc.getBase = 1;
			}
			mainService.productBag[index].productQunatity += 1;
			mainService.productBag[index].price += mainService.productBag[index].basePrice;
			$scope.totalPrice = 0;
			$scope.productTotal();
		}

		$scope.lessQuantity = function(index, basePrice){

			if (mainService.productBag[index].productQunatity > 1){
				mainService.productBag[index].productQunatity -= 1;
				mainService.productBag[index].price -= mainService.productBag[index].basePrice;
			}
			$scope.totalPrice = 0;
			$scope.productTotal();
		}

		// GET TOTAL PRODUCT
		$scope.productTotal = function(){

			console.log(mainService.productBag)
			angular.forEach(mainService.productBag,function(data) {

				if (data.price === 'FREE'){
					data.price = 0
					data.discount = 0
				}else if(!data.discount){
					data.discount = 0
				}

				$scope.totalPrice += data.price;
				// console.log(data)
			})

			// console.log($scope.totalPrice);
			return $scope.totalPrice;
		}

		// INVOKE FUNC
		$scope.productTotal();

		$scope.continueBtn = function(){
			if($scope.shoppingCart){
				console.log('ShoppingCart')
			}else if($scope.signin){
				console.log('signin')
			}
			else if($scope.shippingDetail){
				console.log('shippingDetail')
			}
			else{
				console.log('payment')
			}
		}
}
