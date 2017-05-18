pronita.controller('profileController', profileDetail);

profileDetail.$inject = ['$scope', 'getproduct'];

function profileDetail($scope, getproduct) {

    var pd = this;

    pd.url = "../../data.json";

    pd.getProductList = function() {
        var productList = getproduct.getAllProduct(pd.url);

        productList.then(function(result) {
            $scope.allProducts = result;
        })
    };

    // CALL FUNCTION
    pd.getProductList();

}