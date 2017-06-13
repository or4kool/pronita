pronita.config(function($routeProvider) {

    $routeProvider
        .when('/', { templateUrl: 'view/home.html', controller: 'homeController' })
        .when('/offers', { templateUrl: 'view/offers.html', controller: 'offerController' })
        .when('/product/:productId', { templateUrl: 'view/product.html', controller: 'productController' })
        .when('/create-account', { templateUrl: 'view/create-account.html', controller: 'createAccountController' })
        .when('/cart', { templateUrl: 'view/cart.html', controller: 'cartController' })
        .when('/user', { templateUrl: 'view/user.html', controller: 'userController' })
        .when('/productupload', { templateUrl: 'view/productupload.html', controller: 'productuploadController' })
        .when('/new-offer', { templateUrl: 'view/new-offers.html', controller: 'newOfferCtrl' })
        .when('/new-offer1', { templateUrl: 'view/new-offer1.html', controller: 'newOffer1Ctrl' })
        .when('/profile', { templateUrl: 'view/profile.html', controller: 'profileController' })
        .when('/inventory', { templateUrl: 'view/inventory.html', controller: 'inventoryCtrl' })
        .when('/category', { templateUrl: 'view/category.html', controller: 'categoryCtrl' })
        .when('/subcategory', { templateUrl: 'view/subcategory.html', controller: 'subcategoryCtrl' });


});