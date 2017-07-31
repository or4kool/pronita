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



    var cartOn = ['$scope', 'addCart', '$location', 'mainService', '$localStorage', function($scope, addCart, $location, mainService, $localStorage) {

        $scope.isDot = '';
        // $scope.on = 1;
        // $scope.off = 0;

        const loginUrl = "/appActions/userLogin";
        $scope.userDetail = {}
        $scope.loggedIn = 0;

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

        $scope.doSignup = function(){
            
            console.log($scope.userDetail)
            var signin = mainService.poster($scope.userDetail, loginUrl)
                .then(function(result){
                    console.log(result);

                    if(result._id){
                        $scope.userDetail = '';
                        $scope.loggedIn = 1;
                        $scope.userInfo = result;
                        // STORE USER INFORMATION CLEAR ANY PREVIOUSLY INFO
                        $localStorage.$reset();
                        var  userLocalInfo = $localStorage.$default({sUserData: result})
                        // console.log(userLocalInfo);
                        mainService.setUserData(result)
                    }
                    
            })
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


pronita.directive('selectAnswer', function($sce, $scope){

    var allElements = [];

    function handleclick($scope, elem, iAttrs){

        console.log($sce)
        allElements.push(elem)
        console.log(allElements)

        elem.bind('click', function(){
            // angular.forEach(allElements, function(data){
            //     console.log(data);

            //     data[0].className = 'hide-li';

            // })

            // elem[0].className = 'show-li';

            // console.log(elem[0].className)

            // $scope.sAnswer = allElements.

            var firstTop = allElements[0];

            console.log(elem[0].innerText);

            if(elem[0].innerText === 'Rate with'){
                console.log('Yeh')
                elem[0].innerText = 'Rate with' + '<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>'
                console.log(elem[0].innerText);
            }
            console.log(elem[0].innerText);
            firstTop[0].innerText = elem[0].innerText;
        })
    }

    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: handleclick,
        scope: {
            sAnswer: '='
        }
    };
});

// pronita.directive('loginUser', function(){

//     console.log("YEP INSIDE LOGINUSER");

//     this.handleLogin = function(scope, ele, attr){
//         ele.bind('click', function() {

//            console.log("here");


//         })
//     }

//     this.testers = function(){
//         console.log("Feel alone");
//     }

//     return{
//         restric: 'A',
//         link: handleLogin,
//         controller: testers,
//         templateUrl: '../view/loginpopup.html'
//     }


// })

// pronita.directive('popUp', function() {




//     return {
//         restirc: 'E',
//         templateUrl: '../view/loginpopup.html',
//         replace: true,
//         scope: {
//             loginUser: "&",
//             testUser: "="
//         }
//     }
// });

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