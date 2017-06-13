pronita.controller('subcategoryCtrl', subcategoryDetail);

subcategoryDetail.$inject = ['$scope', 'mainService', '$timeout'];

function subcategoryDetail($scope, mainService, $timeout) {

    var cc = this;

    cc.subUrl = '/appActions/subCategory';
    cc.catUrl = '/appActions/category';

    $scope.catData = {
        category: '',
        SubCategoryname: '',
        description: ''
    }

    $scope.sendSuccess = 0;

    $scope.categoryOptions = [];
    $scope.selectedCat = { id: '', name: '' };

    $scope.postSubCat = function(catID) {

        $scope.catData.category = catID;

        // console.log($scope.catData);
        var postSubCat = mainService.poster($scope.catData, cc.subUrl);
        postSubCat.then(function(result) {
            // console.log(result);
            $scope.sendSuccess = result;
            $scope.sendSuccess = 1;
            $timeout(function() {
                $scope.sendSuccess = 0;
            }, 3000);

            $scope.catData.SubCategoryname = '';
            $scope.catData.description = '';
            cc.getSubCat();
        })
    }

    cc.getCat = function() {
        var getAllCat = mainService.fetchData(cc.catUrl);
        getAllCat.then(function(result) {
            $scope.catResults = result.data;
            angular.forEach($scope.catResults, function(result) {
                $scope.categoryOptions.push({ id: result._id, name: result.name });
            });
        })
    };
    // GET ALL CATEGORY
    cc.getCat();

    cc.getSubCat = function() {
        var getAllSubCat = mainService.fetchData(cc.subUrl);
        getAllSubCat.then(function(result) {
            console.log(result);
            $scope.allSubCats = result.data;
            // console.log()
        })
    }

    // GET ALL SUB CATEGORY
    cc.getSubCat();

}