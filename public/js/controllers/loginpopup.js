pronita.controller('loginCtrl', loginCtrlDetails);

	loginCtrlDetails.$inject = ['$scope', 'mainService']

	function loginCtrlDetails($scope, mainService){

		var lc = this;

		lc.loginUrl = "/appActions/userLogin";

		$scope.userDetail = {};

		$scope.loginUser = function(){
			var signin = mainService.poster($scope.userDetail, lc.loginUrl);
			signin.then(function(result){
				console.log(result);
			})
		}

	}