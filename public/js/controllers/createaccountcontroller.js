pronita.controller('createAccountController', ['$scope','mockService','$q', function($scope,mockService,$q){
		
		$scope.userInfo = {};


		var createUserUrl = '/appActions/user';
		$scope.alreadyUser = "";

		$scope.CreateNewUser = function(){
			
			var parts = $scope.fullname.split(' ');

			var firstName = parts[0];
			var lastName = parts[1];

			$scope.userInfo.firstName = firstName;
			$scope.userInfo.lastName = lastName;

			console.log($scope.userInfo)
			var pros = mockService.poster($scope.userInfo, createUserUrl);
			pros.then(function(result){
				console.log(result);
				$scope.alreadyUser = result.data[0].userName;
				console.log($scope.alreadyUser);

				if ($scope.userInfo.userName != $scope.alreadyUser){
					$scope.fullname = "";
					$scope.alreadyUser = "";
					$scope.userInfo = {};
				}
			});	

		}
}]);