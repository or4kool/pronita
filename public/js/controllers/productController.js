pronita.controller('productController', ['$scope', function($scope){

	$scope.recommendationList = [];
	$scope.recommendationCount = 0;

	$scope.recommender = function(num){

		if ($scope.recommendationCount < 1){
			for (var i = 0; i < num; i++){
				$scope.recommendationList.push(i);
			}
		}

		$scope.recommendationCount = 1;
		return $scope.recommendationList;
	}
	
}]);