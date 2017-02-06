pronita.controller('cartController',['$scope',function($scope){

	$scope.shoppingCart = 1;
	$scope.signin = 0;
	$scope.shippingDetail = 0;
	$scope.payment  = 0;
	$scope.currentCartPos = 0;
	$scope.on = 1;
	$scope.off = 0;

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

}]);