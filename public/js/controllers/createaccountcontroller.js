pronita.controller('createAccountController', createAccountDetails);

createAccountDetails.$inject = ['$scope', 'mainService', '$window', '$timeout'];

function createAccountDetails($scope, mainService, $window, $timeout) {

    var cac = this;


    cac.regUrl = '/appActions/user';

    $scope.userData = {};

    $scope.showPwdError = 0;
    $scope.shortPwdmsg = 0;
    $scope.showMsg = 0;
    $scope.showLoader = 0;

    // COMPARE ENTERED PASSWORD
    $scope.comparePwd = function(pwd1, pwd2) {

        if (pwd1 !== pwd2) {
            $scope.showPwdError = 1;
        } else {
            $scope.showPwdError = 0;
        }
    }

    // CHECK LENGTH OF PASSWORD
    $scope.pwdLength = function(pwd) {
        if (pwd.length < 6) {
            $scope.shortPwdmsg = 1;
        } else {
            $scope.shortPwdmsg = 0;
        }
    }


    // CREATE NEW USER
    $scope.CreateNewUser = function() {
        console.log($scope.userData);


        if (($scope.showPwdError === 0) && ($scope.shortPwdmsg === 0)) {

            var regUser = mainService.poster($scope.userData, cac.regUrl);
            $scope.showLoader = 1;
            regUser.then(function(result) {
                console.log(result);
                $scope.showLoader = 0;
                if ($scope.userData.userName === result.userName) {
                    $scope.showMsg = 1;
                    $scope.regMsg = "successReg";
                    $scope.userData = {};
                    $scope.userMsg = "Congratulations!, Successfully Registered"
                    $timeout(function() {
                        $scope.showMsg = 0;
                    }, 3000);
                } else if (result.error === 'User Already Exist') {
                    $scope.showMsg = 1;
                    $scope.regMsg = "noReg"
                    $scope.userData = {};
                    $scope.userMsg = result.error
                    $timeout(function() {
                        $scope.showMsg = 0;
                    }, 3000);
                }
            })
        }
    }
}







// 		$scope.userInfo = {};


// 		var createUserUrl = '/appActions/user';
// 		$scope.alreadyUser = "";

// 		$scope.CreateNewUser = function(){

// 			var parts = $scope.fullname.split(' ');

// 			var firstName = parts[0];
// 			var lastName = parts[1];

// 			$scope.userInfo.firstName = firstName;
// 			$scope.userInfo.lastName = lastName;

// 			console.log($scope.userInfo)
// 			var pros = mockService.poster($scope.userInfo, createUserUrl);
// 			pros.then(function(result){
// 				console.log(result);
// 				$scope.alreadyUser = result.data[0].userName;
// 				console.log($scope.alreadyUser);

// 				if ($scope.userInfo.userName != $scope.alreadyUser){
// 					$scope.fullname = "";
// 					$scope.alreadyUser = "";
// 					$scope.userInfo = {};
// 				}
// 			});	

// 		}
// }]);