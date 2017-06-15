pronita.service('mainService', mainServiceDetail);

mainServiceDetail.$inject = ['$http', '$q', '$rootScope'];

function mainServiceDetail($http, $q, $rootScope) {

    // this.productBag = [];

    var productImg = '';


    this.poster = function(sendData, url) {
        var deffered = $q.defer();
        $http({
            method: 'POST',
            url: url,
            data: sendData,
            headers: { 'Content-Type': 'application/json' }

        }).then(function successCallback(response) {
            
            deffered.resolve(response.data);
            
        }, function errorCallback(response) {

        });

        return deffered.promise;
    };

    this.imgPoster = function(sendData, url) {
        var deffered = $q.defer();
        $http({
            method: 'POST',
            url: url,
            data: sendData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }

        }).then(function successCallback(response) {

            // console.log(response.data.error);
            deffered.resolve(response.data);
            // deffered.resolve(response.data);

            // console.log(deffered.promise);

        }, function errorCallback(response) {

        });

        return deffered.promise;
    };


    this.fetchData = function(url) {

        var deffered = $q.defer();

        $http({
            method: 'GET',
            url: url,
            headers: { 'Content-Type': 'application/json' }

        }).then(function successCallback(response) {

            deffered.resolve(response);

        }, function errorCallback(response) {

        });

        return deffered.promise;
    };


    this.setImg = function(imgArray){
        productImg = imgArray;
    }

    this.getImg = function(){
        return productImg
    }


this.blobToImg = function(blob, filename){
    var newFile = new File([blob], filename);

    return newFile;
}


};


pronita.service('addCart', addCartDetails);

addCartDetails.$inject = ['$rootScope'];

function addCartDetails($rootScope) {

    var ad = this;

    ad.cartDot = '';

    ad.inventory = {
        productImg: "img/product-display.png",
        productName: "Rosaline flower pot",
        productTestPeriod: "1 month",
        productDelivery: "1-3 working days",
        productQunatity: 1,
        proudctPrice: "28000",
        discountedPrice: "25000"
    }

    ad.productBag = [];

    ad.addIt = function() {
        console.log(ad.productBag.length);
        if (ad.productBag.length > 0) {
            console.log("YEP EXTRA");
            for (var i = 0; i < ad.productBag.length; i++) {
                if (ad.productBag[i].productName) {
                    ad.productBag[i].productQunatity += 1;
                }
            }

        } else {
            ad.productBag.push({
                productImg: ad.inventory.productName,
                productName: ad.inventory.productName,
                productTestPeriod: ad.inventory.productTestPeriod,
                productDelivery: ad.inventory.productDelivery,
                productQunatity: ad.inventory.productQunatity,
                proudctPrice: ad.inventory.proudctPrice,
                discountedPrice: ad.inventory.discountedPrice
            });
        }


        // console.log(ad.productBag);


    }

};



pronita.service('getproduct', getproductDetails);

getproductDetails.$inject = ['mainService', '$rootScope', '$q'];

function getproductDetails(mainService, rootScope, $q) {

    this.getAllProduct = function(url) {

        var def = $q.defer();

        this.productData = '';

        var productLists = mainService.fetchData(url);

        productLists.then(function(result) {
            // console.log(result.data.products);
            if (result.data.status == 'success') {
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