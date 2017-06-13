pronita.controller('homeController', homeControllerDetails);


	homeControllerDetails.$inject = ['$scope', 'mainService','$location','addCart'];

	function homeControllerDetails($scope,mainService,$locationa,ddCart){

			var hc = this;

			$scope.topnewHeader = 'top new';

			$scope.productCount = [0,1,2,3];

			hc.url = '/appActions/inventory';
			// hc.url = "../../data.json";
			$scope.productData = '';


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

			$scope.addCarter = function(){

				addCart.addIt();
				$location.url("/cart");
			}



		  hc.getAllProduct = function(url){

		  	hc.productLists = mainService.fetchData(url);

		  	hc.productLists.then(function(result){
				  console.log(result);
		  		// console.log(result.data.products);
		  		// if (result.data.status == 'success'){
			  		$scope.productData = result.data;

					//   if 
					//   console.log($scope.productData.length);
		  		// }
		  	});
		  }

		// LOAD ALL PRODUCTS
		hc.getAllProduct(hc.url);

		$scope.productDetail = function(productId){
			// console.log(productId);
			$locationa.url('/product/' + productId)
		}



	}
	
	

