pronita.controller('inventoryCtrl', inventoryCtrlDetails);

inventoryCtrlDetails.$inject = ['$scope', 'mockService'];

function inventoryCtrlDetails($scope, mockService){

	var ic = this;

	ic.url = "/appActions/inventory";

	$scope.inventoryData = {};
	$scope.others = {};

	$scope.productTypes = ['product type', 'Free', 'Dsicounted'];

	// $scope.productSubcategories = ['Select product sub-category', 'Agriculture', 'Fashion', 'Electronics'];
	// $scope.productCategories = ['Select product sub-category', 'Agriculture', 'Fashion', 'Electronics'];

	$scope.sendInventory = function(){

		console.log($scope.inventoryData);

		ic.pushInventory = mockService.poster($scope.inventoryData, ic.url);

		ic.pushInventory.then(function(result){
			console.log(result);
		})
	}

}