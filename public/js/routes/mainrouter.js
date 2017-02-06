pronita.config(function($routeProvider){
	
	$routeProvider
			.when('/', { templateUrl: 'view/home.html',controller: 'homeController'})
			.when('/offers', {templateUrl: 'view/offers.html', controller: 'offerController'})
			.when('/product', {templateUrl: 'view/product.html', controller: 'productController'})
			.when('/create-account', {templateUrl: 'view/create-account.html', controller: 'createAccountController'})
			.when('/cart', {templateUrl: 'view/cart.html', controller: 'cartController'})
			.when('/user', {templateUrl: 'view/user.html', controller: 'userController'})
			.when('/productupload', {templateUrl: 'view/productupload.html', controller: 'productuploadController'});


});