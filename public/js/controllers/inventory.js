pronita.controller('inventoryCtrl', inventoryCtrlDetails);

inventoryCtrlDetails.$inject = ['$scope', 'mainService'];

function inventoryCtrlDetails($scope, mainService){

	var ic = this;

	ic.url = "/appActions/inventory";

	$scope.inventoryData = {};
	$scope.others = {};

	$scope.productTypes = ['product type', 'Free', 'Dsicounted'];

	// $scope.productSubcategories = ['Select product sub-category', 'Agriculture', 'Fashion', 'Electronics'];
	// $scope.productCategories = ['Select product sub-category', 'Agriculture', 'Fashion', 'Electronics'];

	$scope.sendInventory = function(){

		console.log($scope.inventoryData);

		ic.pushInventory = mainService.poster($scope.inventoryData, ic.url);

		ic.pushInventory.then(function(result){
			console.log(result);
		})
	}

}