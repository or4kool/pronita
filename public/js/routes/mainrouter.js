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
        .when('/pricing', { templateUrl: 'view/pricing.html', controller: '' })
        .when('/subcategory', { templateUrl: 'view/subcategory.html', controller: 'subcategoryCtrl' })
        .when('/question', { templateUrl: 'view/question.html', controller: '' })
        .when('/question-review', { templateUrl: 'view/question-review.html', controller: 'questionReviewCtrl' });


});


pronita.run(function($rootScope, $location, $localStorage, mainService){
    
    // console.log(mainService);
    $rootScope.$on('$routeChangeStart', 
        function(event, next, prev){ 
            // event.preventDefault();
            console.log("ALLLOVE " + next.$$route.originalPath.indexOf('new-offer'))


            if(next.$$route.originalPath.indexOf('new-offer') === 1){
                                
                if(!$localStorage.loginChecker){
                    event.preventDefault();
                    $location.path('/')
                }
                

            }

            // if($localStorage.loginChecker){

            // }
        })
    
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams){
        console.log(to)
    })
});