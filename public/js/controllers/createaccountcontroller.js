pronita.controller('createAccountController', ['$scope','mockService','$q', function($scope,mockService,$q){
		
		var userinfo = {};


		var createUserUrl = '/appActions/user';
		$scope.alreadyUser = "";

		$scope.CreateNewUser = function(){
			
			var parts = $scope.fullname.split(' ');

			var firstName = parts[0];
			var lastName = parts[1];

			userinfo.firstName = firstName;
			userinfo.lastName = lastName;

			var pros = mockService.poster(userinfo, createUserUrl);
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