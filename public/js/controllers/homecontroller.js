pronita.controller('homeController', homeControllerDetails);


	homeControllerDetails.$inject = ['$scope', 'mainService','$location','addCart'];

	function homeControllerDetails($scope,mainService,$location,ddCart){

			var hc = this;

			$scope.topnewHeader = 'top new';

			$scope.productCount = [0,1,2,3];

			hc.url = '/appActions/inventory';

			hc.loginUrl = "/appActions/userLogin";

			$scope.userDetail = {};
			// hc.url = "../../data.json";
			$scope.productData = '';

			$scope.freeProductData = [];
			$scope.discountedProductData = [];


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



			// FETCH ALL MOST LIKED PRODUCT
		  hc.getAllProduct = function(url){

			url += '?populate=inventorySettings category offerConditions&limit=4&skip=0'

			console.log(url);
		  	hc.productLists = mainService.fetchData(url);

		  	hc.productLists.then(function(result){
				  console.log(result);
			  		$scope.productData = result.data;


			  		angular.forEach($scope.productData, function(data) {
			  			if (data.inventorySettings.price === null){
						  data.inventorySettings.price = "FREE"
					  }
			  		})
		  	});
		  }

		// LOAD ALL MOST LIKED PRODUCTS
		hc.getAllProduct(hc.url);

		// GET FREE PRODUCTS
		hc.getFreeproducts = function(url){
			url += '?populate=inventorySettings category offerConditions&limit=4&skip=0'

			// console.log(url);
		  	hc.productLists = mainService.fetchData(url);

		  	hc.productLists.then(function(result){

				  angular.forEach(result.data, function(data){
				  	
				  	if(!data.inventorySettings.price){
				  		data.inventorySettings.price = "FREE"
				  		console.log(data)
				  		$scope.freeProductData.push(data);
				  	}
				  })

		  	});
		}

		// FETCH FREE PRODUCTS
		hc.getFreeproducts(hc.url);

		hc.getDiscountedProduct = function(url){
			url += '?populate=inventorySettings category offerConditions&limit=4&skip=0'

			// console.log(url);
		  	hc.productLists = mainService.fetchData(url);

		  	hc.productLists.then(function(result){

		  		console.log(result)
				  angular.forEach(result.data, function(data){
				  	console.log(data.inventorySettings.discount)
				  	if(data.inventorySettings.discount){
				  		console.log("Yeh Yeh I got here")
				  		$scope.discountedProductData.push(data);
				  	}
				  })
		  	});
		}

		// FETCH DISCOUNTED PRODUCT
		hc.getDiscountedProduct(hc.url);


		$scope.productDetail = function(productId){
			// console.log(productId);
			$location.url('/product/' + productId);
		}


		$scope.loginUser = function(){
			var signin = mainService.poster($scope.userDetail, hc.loginUrl);
			signin.then(function(result){
				console.log(result);
			})
		}


	}
	
	

