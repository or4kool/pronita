pronita.controller('homeController', ['$scope', 'mockService',function($scope,mockService){
	
	$scope.topnewHeader = 'top new';

	$scope.productCount = [0,1,2,3];


	// var senddata = PaystackPop.setup({
	// 	key: 'pk_test_8437d5de4e179a4041828c8c5affce04e065eca9',
 //      email: 'customer@email.com',
 //      amount: 10000,
 //      ref: "qwery1234s5k6hj",
 //      metadata: {
 //         custom_fields: [
 //            {
 //                display_name: "Mobile Number",
 //                variable_name: "mobile_number",
 //                value: "+2348012345678"
 //            }
 //         ]
 //      },

 //      callback: function(response){
 //      		console.log(response.reference);
 //      },
 //      onClose: function(){
 //          alert('window closed');
 //      }
	// });

	$scope.runStack = function(){

		console.log("SHOE");
		senddata.openIframe();
	}

	// var theUrl = "https://js.paystack.co/v1/inline.js";

	// $scope.ranStack = function(){
	// 	mockService.poster(senddata,theUrl)
	// 		.then(function(result){
	// 			console.log(result);
	// 	});
	// }
	

}]);