pronita.directive('belowFootie', function() {
    // Runs during compile
    return {
        restric: 'E',
        templateUrl: '../view/foot.html',
        replace: true
    };
});

pronita.directive('singleProduct', function() {

    return {
        restric: 'E',
        templateUrl: '../view/productdisplay.html',
        replace: true,
        scope: {
            productDetail: "&",
            productData: "="
        }
    };
});

pronita.directive('getApp', function() {
    // Runs during compile
    return {
        restric: 'E',
        templateUrl: '../view/apparea.html',
        replace: true,
        scope: {}
    };
});

pronita.directive('shoppingCart', function() {

    // Runs during compile
    return {
        restric: 'E',
        templateUrl: '../view/shopcart.html',
        replace: true,
        scope: {
            productName: "&",
            buttonClose: "&"
        }

    };
});

pronita.directive('cater', function() {
    var entered = function(scope, elem, attr) {
        elem.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(scope.postFn);
                })
                event.preventDefault();
            }
        })
    }
    return {
        scope: {
            postFn: '&'
        },
        link: entered
    }
})

pronita.directive('showImg', function() {
    return {

        scope: {
            // showImg: "&"
            showImg: "=",
            anotherShow: "="
        },
        link: function(scope, ele, attr) {
            ele.bind('change', function(changeEvent) {
                // console.log(changeEvent.target.files[0]);
                // console.log(changeEvent.target.files[0]);
                scope.$apply(function(){
                    scope.showImg = changeEvent.target.files[0];
                })
                var imgReader = new FileReader();
                imgReader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        console.log(loadEvent);
                        scope.anotherShow = loadEvent.target.result;
                        
                        console.log(scope.anotherShow);

                    })
                }
                console.log(changeEvent.target.files[0]);
                imgReader.readAsDataURL(changeEvent.target.files[0])
                console.log(imgReader);
            })
        }
    }
})

// pronita.directive('shoppingSign', function(){

// 	return {
// 		restric: 'E',
// 		templateUrl: '../view/shopsign.html',
// 		replace: true,
// 		scope: {

// 		}
// 	};

// });

// pronita.directive('shippingDetails', function(){

// 	return{
// 		restric: 'E',
// 		templateUrl: '../view/shipping.html',
// 		replace: true,
// 		scope: {

// 		}

// 	};

// });

// pronita.directive('paymentMethod', function(){

// 	return {
// 		restric: 'E',
// 		templateUrl: '../view/payment.html',
// 		replace: true,
// 		scope: {

// 		}

// 	};

// });

pronita.directive('headie', function() {

    var cartOn = ['$scope', 'addCart', '$location', function($scope, addCart, $location) {

        $scope.isDot = '';
        // $scope.on = 1;
        // $scope.off = 0;

        $scope.isProduct = function() {
            if (addCart.cartDot == '1') {

                $scope.isDot = 'cart-dot';
                console.log("ISPRODUCT::" + $scope.isDot);
                // if ($location.path() == '/cart'){
                // 	$scope.isDot = '';
                // }
                return $scope.isDot;
            }
        }

        // $scope.gocart = function(){
        // 	$scope.isDot = '';
        // 	console.log("GOCART::" + $scope.isDot);
        // 	$location.url('/cart');
        // 	console.log($location.path());
        // 	return $scope.isDot;
        // }
        $scope.gocart = function() {
            addCart.cartDot = 0;
            $scope.isDot = '';
            $location.url('/cart');
            return $scope.isDot;
        }
    }];


    return {
        restric: 'E',
        templateUrl: '../view/header.html',
        replace: true,
        scope: {

        },
        controller: cartOn
    }

});

pronita.directive('popUp', function() {

    return {
        restirc: 'E',
        templateUrl: '../view/loginpopup.html',
        replace: true,
        scope: {

        }
    }
});

pronita.directive('linker', function() {

    this.handleLink = function(scope, element, attr) {
        element.bind('click', function() {

            if (attr.loc == 0) {
                scope.productInfo.keyFeatures = 1;
                scope.productInfo.specifications = 0;
                scope.productInfo.offerDetails = 0;
                scope.productInfo.offerConditions = 0;
                scope.productInfo.reviews = 0;
            } else if (attr.loc == 1) {
                scope.productInfo.keyFeatures = 0;
                scope.productInfo.specifications = 1;
                scope.productInfo.offerDetails = 0;
                scope.productInfo.offerConditions = 0;
                scope.productInfo.reviews = 0;
            } else if (attr.loc == 2) {
                scope.productInfo.keyFeatures = 0;
                scope.productInfo.specifications = 0;
                scope.productInfo.offerDetails = 1;
                scope.productInfo.offerConditions = 0;
                scope.productInfo.reviews = 0;
            } else if (attr.loc == 3) {
                scope.productInfo.keyFeatures = 0;
                scope.productInfo.specifications = 0;
                scope.productInfo.offerDetails = 0;
                scope.productInfo.offerConditions = 1;
                scope.productInfo.reviews = 0;
            } else {
                scope.productInfo.keyFeatures = 0;
                scope.productInfo.specifications = 0;
                scope.productInfo.offerDetails = 0;
                scope.productInfo.offerConditions = 0;
                scope.productInfo.reviews = 1;
            }

            scope.$apply("productInfo");


        })
    }

    return {
        restric: 'A',
        link: handleLink
    }
});