pronita.service('mockService', mainServiceDetail);

	mainServiceDetail.$inject = ['$http','$q', '$rootScope'];

	function mainServiceDetail($http,$q,$rootScope){

	// this.productBag = [];

	var deffered = $q.defer();
		
	this.poster = function(sendData, url){

		$http({
				method: 'POST',
				url: url,
				data: sendData,
				headers : {'Content-Type': 'application/json'}

		}).then(function successCallback(response){

				// console.log(response.data.error);
				deffered.resolve(response);
				// deffered.resolve(response.data);

				// console.log(deffered.promise);

		}, function errorCallback(response){

		});

		return deffered.promise;
	};	


};

pronita.service('dataFetcher', dataFetcherDetail);

	dataFetcherDetail.$inject = ['$http', '$q', '$rootScope'];

	function dataFetcherDetail($http, $q, $rootScope){
		
		this.fetchData = function(url){

			var deffered = $q.defer();

			$http({
					method: 'GET',
					url: url,
					headers : {'Content-Type': 'application/json'}

			}).then(function successCallback(response){

					deffered.resolve(response);
					
			}, function errorCallback(response){

			});

			return deffered.promise;
		};

	};





pronita.service('addCart', addCartDetails);

		addCartDetails.$inject = ['$rootScope'];

		function addCartDetails($rootScope){

			var ad = this;

			ad.cartDot = '';

			ad.inventory = {
				productImg:"img/product-display.png",
				productName:"Rosaline flower pot",
				productTestPeriod: "1 month",
				productDelivery: "1-3 working days",
				productQunatity: "1",
				proudctPrice: "28000",
				discountedPrice: "25000"
			}

			ad.productBag = [];

			ad.addIt = function(){

				
				ad.productBag.push({
					productImg:ad.inventory.productName,
					productName:ad.inventory.productName,
					productTestPeriod:ad.inventory.productTestPeriod,
					productDelivery:ad.inventory.productDelivery,
					productQunatity:ad.inventory.productQunatity,
					proudctPrice:ad.inventory.proudctPrice,
					discountedPrice:ad.inventory.discountedPrice
				});
				console.log(ad.productBag);

				
			}

		};



pronita.service('getproduct', getproductDetails);

getproductDetails.$inject = ['dataFetcher','$rootScope', '$q'];

function getproductDetails(dataFetcher, rootScope, $q){

	  this.getAllProduct = function(url){

	  	var def = $q.defer();

	  	this.productData = '';

	  	var productLists = dataFetcher.fetchData(url);

	  	productLists.then(function(result){
	  		// console.log(result.data.products);
	  		if (result.data.status == 'success'){
		  		this.productData = result.data.products;
	  			// console.log(productData);
	  			def.resolve(productData);
		  		// return productData;
	  		}
	  	});

	  	// console.log(productData);
		 return def.promise;

	  }

}


	

	
