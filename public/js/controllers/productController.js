pronita.controller('productController', productDetail);


	productDetail.$inject = ['$scope','$location', 'mainService', 'addCart', '$routeParams'];

	function productDetail($scope,$location, mainService, addCart, $routeParams){

		var pc = this;


	pc.recommendationList = [];
	pc.recommendationCount = 0;

	pc.url = '/appActions/inventory';
	pc.userUrl = "/appActions/userProfile";

	pc.liked = 'fa fa-heart';
	pc.unliked = 'fa fa-heart-o';
	$scope.confirmLike = pc.unliked;

	pc.url = '/appActions/inventory'

	// $scope.selectedproduct = {Rocknrool : 'want one'};

	$scope.isLike = 0;
	$scope.showTab = 1;
	$scope.hideTab = 0;
	pc.isproduct = 0;

	$scope.selectedTabArea = 'keyFeatures'

	

	// pc.inventory = {
	// 	productImg:"img/product-display.png",
	// 	productName:"Rosaline flower pot",
	// 	productTestPeriod: "1 month",
	// 	productDelivery: "1-3 working days",
	// 	productQunatity: "1",
	// 	proudctPrice: "28000",
	// 	discountedPrice: "25000"
	// }

	$scope.productInfo = {
		keyFeatures: 1,
		specifications: 0,
		offerDetails: 0,
		offerConditions: 0,
		review: 0

	}
	

	$scope.recommender = function(num){

		if (pc.recommendationCount < 1){
			for (var i = 0; i < num; i++){
				pc.recommendationList.push(i);
			}
		}

		pc.recommendationCount = 1;
		return pc.recommendationList;
	};

	var tashment = 1;
	var add = 0;


	$scope.addCarter = function(){

		addCart.addIt();
		// $location.url("/cart");
	}


	// $scope.pushToCart();

	// LIKE PRODUCT
	$scope.productLiked = function(){

		if ($scope.confirmLike == pc.unliked){
			$scope.confirmLike = pc.liked;

			//add one to the like array for product
			$scope.isLike += 1;
			$scope.productLikes.push($scope.isLike);
			console.log($scope.productLikes)
		}
		else{
			console.log('Yo Got here First');
			$scope.confirmLike = pc.unliked;
			$scope.isLike = ($scope.singleProduct.likes[($scope.singleProduct.likes.length-1)])-1;
			// $scope.isLike -= 1
			$scope.productLikes.push($scope.isLike);
			console.log($scope.productLikes)
			//pop one from the like array for product
		}

		return $scope.confirmLike;

	}


	// GET SINGLE PRODUCT
	$scope.getSingleProduct = function(url){
		var url = url + '/' + $routeParams.productId + '?populate=inventorySettings category offerConditions keyFeatures offerDetails specifications';
		// console.log(url);
		var productData = mainService.fetchData(url);
		productData.then(function(result){
			console.log(result)
			$scope.singleProduct = result.data;
			// CONVERT SRING INTO ARRAY
			$scope.otherPics = $scope.singleProduct.allPic.split(',');

			if ($scope.singleProduct.inventorySettings.price === null){
				$scope.singleProduct.inventorySettings.price = 'FREE'
				$scope.singleProduct.inventorySettings.discount = ''
			}
			// console.log(result);

			// INVOKE LIKES
			pc.getLikes();
		})
	}

	$scope.getSingleProduct(pc.url);

	// FETCH LIKES
	pc.getLikes = function(){
		pc.likeUrl = 'appActions/likes/';

		pc.likeUrl += $scope.singleProduct._id + 'type=user'
		console.log(pc.likeUrl)

		var allLikes = mainService.fetchData(pc.likeUrl);
			allLikes.then(function(result){
				console.log({LIKES:result})
				// $scope.productLikes = result.data ? result.data :

				if(!result.data){
					result.data.push(0);
				}else{
					$scope.productLikes = result.data;
				}

			})
	}

	// INVOKE PRODUCT LIKES
	// pc.getLikes();


	// HANDLE TAB ONCLICK
	$scope.changeTab = function(tabArea){
		$scope.selectedTabArea = tabArea;
	}


	// RETURN CLASS NAME
	$scope.productClassTab = function(tabSelected){
		if (tabSelected === $scope.selectedTabArea){
			return 'selected'
		}
	}


	// GET THE CURRENT TAB CONTENT TO SHOW
	$scope.getCurrentTab = function(area){

		if ($scope.selectedTabArea === area){
			return $scope.showTab
		}
		else{
			$scope.hideTab
		}

	}

	// ADD PRODUCT TO CART
	$scope.pushToCart = function(){

		// CHECK IF PRODUCT IN CART
		if (pc.productCheck() === 'add to cart'){
			// CALL SERVICE TO ADD SELECTED PRODUCT TO CART BAG
			addCart.cartDot = 1;
			addCart.addIt();

			// console.log($scope.singleProduct);

			pc.selectedProduct = {
				name: $scope.singleProduct.name,
				pics: $scope.singleProduct.profilePic,
				price: $scope.singleProduct.inventorySettings.price,
				discount: $scope.singleProduct.inventorySettings.discount,
				productQunatity: 1,
				productId: $routeParams.productId

			}

			// console.log(pc.selectedProduct);

			mainService.productBag.push(pc.selectedProduct)

			// CHANGE BTN TEXT
			pc.productCheck();
		}else{
			$location.url('/cart');
		}
		
	}

	pc.productCheck = function(){

		// CHECK TO SEE IF PRODUCT IS IN CART

		 	const cartProducts = mainService.productBag;
		 	const presentproductId = $routeParams.productId;

		 	console.log(cartProducts);

			angular.forEach(cartProducts, function(data){

				console.log(data);

				if (data.productId === presentproductId){
					pc.isproduct = 1;
				}
			})
		
			console.log(pc.isproduct)

			return $scope.btnText = (pc.isproduct) ? "go to cart" : "add to cart"

	}

	// INVOKE FUNCTION
	pc.productCheck();

	pc.getRecommendation = function(url){
		url += '?populate=inventorySettings category offerConditions&limit=4&skip=0&filters={"description":"Physical Product"}'

			// console.log(url);
		  	pc.productLists = mainService.fetchData(url);

		  	pc.productLists.then(function(result){
		  		console.log(result)
		  		$scope.recommendedProducts = result.data;
		  		console.log($scope.recommendedProduct)
		  	});
	}

	pc.getRecommendation(pc.url);

	// GET OTHER USER PRODUCT
	pc.getOtheruserproduct = function(){
		url += '?populate=inventorySettings category offerConditions&limit=4&skip=0&filters={"description":"Physical Product"}'

			// console.log(url);
		  	pc.productLists = mainService.fetchData(url);

		  	pc.productLists.then(function(result){
		  		console.log(result)
		  		$scope.recommendedProducts = result.data;
		  		console.log($scope.recommendedProduct)
		  	});
	}
	
};