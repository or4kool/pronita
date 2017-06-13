pronita.controller('paystack', ['$scope','mainService', function($scope,mainService){

	var senddata = PaystackPop.setup({
		key: 'pk_test_8437d5de4e179a4041828c8c5affce04e065eca9',
      email: 'customer@email.com',
      amount: 10000,
      ref: "UNIQUE TRANSACTION REFERENCE HERE",
      metadata: {
         custom_fields: [
            {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }
         ]
      }
	});

	// var theUrl = "https://js.paystack.co/v1/inline.js";

	

	

	// $scope.runStack = function(){

	// 	mockService.poster(senddata,theUrl)
	// 		.then(function(result){

	// 			console.log("GOT HERE");
				
	// 			console.log(result);
	// 	});
	// }
	
}])