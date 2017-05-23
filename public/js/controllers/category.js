pronita.controller('categoryCtrl', categoryDetail);

categoryDetail.$inject = ['$scope', 'mockService', 'dataFetcher', '$timeout'];

function categoryDetail($scope, mockService, dataFetcher, $timeout) {

    var cc = this;

    cc.url = '/appActions/category';

    $scope.catData = {
        name: '',
        description: ''
    }

    $scope.postCat = function() {

        console.log($scope.catData);
        var postCat = mockService.poster($scope.catData, cc.url);
        postCat.then(function(result) {
            console.log(result);
            $scope.sendSuccess = result;
            $timeout(function() {
                $scope.sendSuccess = '';
            }, 3000);

            $scope.catData.name = '';
            $scope.catData.description = '';
            cc.getCat();
        })
    }

    cc.getCat = function() {
        var getAllCat = dataFetcher.fetchData(cc.url);
        getAllCat.then(function(result) {
            $scope.catResults = result.data;
            console.log(result);
        })
    };

    cc.getCat();
}