pronita.controller('createAccountController', ['$scope','mockService','$q', function($scope,mockService,$q){
		
		$scope.userinfo = {};


		var createUserUrl = '/appActions/user';
		$scope.alreadyUser = "";

		$scope.CreateNewUser = function(){
			
			$scope.parts = $scope.fullname.split(' ');

			$scope.firstName = $scope.parts[0];
			$scope.lastName = $scope.parts[1];

			$scope.userinfo.firstName = $scope.firstName;
			$scope.userinfo.lastName = $scope.lastName;

			var pros = mockService.poster($scope.userinfo, createUserUrl);
			pros.then(function(result){
				console.log(result.data[0].userName);
				$scope.alreadyUser = result.data[0].userName;

				if ($scope.userinfo.userName != $scope.alreadyUser){
					$scope.fullname = "";
					$scope.alreadyUser = "";
					$scope.userinfo = {};
				}
			});	

		}
}]);