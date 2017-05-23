pronita.controller('newOffer1Ctrl', newOffer1Detail);

newOffer1Detail.$inject = ['$scope', 'dataFetcher'];

function newOffer1Detail($scope, dataFetcher) {

    var noc = this;

    // $scope.features = [0];
    $scope.buddy = { title: null, description: null };
    $scope.specifications = { title: null, description: null };
    $scope.offerDetails = { title: null, description: null };
    $scope.offerConditions = { title: null, description: null };
    noc.featuresCount = 0;
    noc.specificationsCount = 0;
    noc.offerDetailsCount = 0;
    noc.offerConditionsCount = 0;

    noc.catUrl = '/appActions/category';

    $scope.disabled = 0;
    $scope.showDiscounted = 0;

    $scope.durations = ['Offer Duration', '30 days'];
    $scope.productTypes = ['Product Type', 'Physical Product', 'Services', 'Software'];
    $scope.categories = [{ name: 'Select Category' }];
    $scope.subCategories = [{ name: 'Select Subcategory' }];
    $scope.locations = ['Offer Location', 'Lagos', 'Ibadan', 'Abuja', 'Kaduna', 'Enugu', 'Others'];
    $scope.offerTypes = ['Offer Type', 'Free', 'Discounted', 'Full Price'];

    // $scope.defualtOfferType = $scope.offerTypes[0];

    // $scope.others = {

    // }


    // $scope.productData = {
    //     productname: '',
    //     productAmount: '',
    //     disProductAmount: '',
    //     duration: $scope.durations[0],
    //     productType: $scope.productTypes[0],
    //     category: $scope.categories[0],
    //     subCategory: $scope.subCategories[0],
    //     location: $scope.locations[0],
    //     others: {
    //         features: [{
    //             title: '',
    //             description: ''
    //         }],
    //         specification: [{
    //             title: '',
    //             description: ''
    //         }],
    //         offerDetails: [{
    //             title: '',
    //             description: ''
    //         }],
    //         offerConditions: [{
    //             title: '',
    //             description: ''
    //         }]
    //     }
    // };

    $scope.productData = {
        name: '',
        description: $scope.productTypes[0],
        rate: $scope.durations[0],
        type: $scope.offerTypes[0],
        category: $scope.categories[0],
        subCategory: $scope.subCategories[0],
        location: $scope.locations[0],
        status: '',
        others: {
            keyFeatures: {
                title: '',
                description: ''
            },
            specifications: {
                title: '',
                description: ''
            },
            offerDetails: {
                title: '',
                description: ''
            },
            offerConditions: {
                title: '',
                description: ''
            },
            inventorySettings: {
                price: '',
                discount: ''
            },
            tags: {
                tags: ''
            }
        }
    };

    $scope.showNext = 1;
    $scope.showBack = 0;

    $scope.changeBack = function() {

        if ($scope.showNext == 0 && $scope.showBack == 1) {
            $scope.showNext = 1;
            $scope.showBack = 0;
        } else {
            $scope.showNext = 0;
            $scope.showBack = 1;
        }

    }


    $scope.uploadProduct = function() {
        $scope.productData.category = $scope.productData.category.id || null;
        $scope.productData.subCategory = $scope.productData.subCategory.id || null;
        console.log($scope.productData);
    }

    $scope.addFeatures = function() {
        noc.featuresCount += 1;
        $scope.productData.others.features.push($scope.buddy = { title: noc.featuresCount, description: noc.featuresCount });
        $scope.buddy.title = null;
        $scope.buddy.description = null;
    }

    $scope.removeFeatures = function(index) {
        noc.featuresCount -= 1;
        $scope.productData.others.features.splice(index, 1);
    }

    $scope.addSpecifications = function() {
        noc.specificationsCount += 1;
        $scope.productData.others.specification.push($scope.buddy = { title: noc.specificationsCount, description: noc.specificationsCount })
        $scope.buddy.title = null;
        $scope.buddy.description = null;
    }

    $scope.removeSpecifications = function(index) {
        noc.specificationsCount -= 1;
        $scope.productData.others.specification.splice(index, 1);
    }

    $scope.addOfferDetails = function() {
        noc.offerDetailsCount += 1;
        $scope.productData.others.offerDetails.push($scope.buddy = { title: noc.featuresCount, description: noc.featuresCount });
        $scope.buddy.title = null;
        $scope.buddy.description = null;
    }

    $scope.removeOfferDetails = function(index) {
        noc.offerDetailsCount -= 1;
        $scope.productData.others.offerDetails.splice(index, 1);
    }

    $scope.addOfferConditions = function() {
        noc.specificationsCount += 1;
        $scope.productData.others.offerConditions.push($scope.buddy = { title: noc.featuresCount, description: noc.featuresCount });
        $scope.buddy.title = null;
        $scope.buddy.description = null;
    }

    $scope.removeOfferConditions = function(index) {
        noc.offerConditionsCount -= 1;
        $scope.productData.others.offerConditions.splice(index, 1);
    }

    // LOAD CATEGORY
    $scope.getCategory = function() {
        var loadCategory = dataFetcher.fetchData(noc.catUrl);
        loadCategory.then(function(result) {

            angular.forEach(result.data, function(data) {
                    $scope.categories.push({ id: data._id, name: data.name });
                })
                // console.log($scope.categories);
        })
    }


    // INVOKE FUNC
    $scope.getCategory();

    $scope.loadSubCat = function(catId) {
        $scope.subCategories = [{ name: 'Select Subcategory' }];
        noc.subCatUrl = '/appActions/subcategory';
        noc.subCatUrl = noc.subCatUrl + '/' + catId;
        loadSubCategory = dataFetcher.fetchData(noc.subCatUrl);
        loadSubCategory.then(function(result) {
            angular.forEach(result.data, function(data) {
                $scope.subCategories.push({ id: data._id, name: data.SubCategoryname })
            })
        })
    }

    $scope.handleOfferType = function(selectedofferType) {
        console.log(selectedofferType);
        switch (selectedofferType) {
            case 'Free':
                $scope.disabledStyle = 'disabledStyle';
                $scope.disabled = 1;
                $scope.showDiscounted = 0;
                return $scope.disabled;
            case 'Discounted':
                $scope.disabledStyle = 'enabledStyle';
                $scope.disabled = 0;
                $scope.showDiscounted = 1;
                return $scope.showDiscounted;
            case 'Full Price':
                $scope.disabledStyle = 'enabledStyle';
                $scope.disabled = 0;
                $scope.showDiscounted = 0;
                return $scope.showDiscounted;
            default:
                $scope.disabledStyle = 'enabledStyle';
                $scope.showDiscounted = 0;
                $scope.disabled = 0;
        }
    }

}