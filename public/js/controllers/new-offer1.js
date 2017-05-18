pronita.controller('newOffer1Ctrl', newOffer1Detail);

newOffer1Detail.$inject = ['$scope'];

function newOffer1Detail($scope) {

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


    $scope.durations = ['Offer Duration', '30 days'];
    $scope.productTypes = ['Product Type', 'Physical Product', 'Services', 'Software'];
    $scope.categories = ['Select Category', '30 days'];
    $scope.subCategories = ['Select Sub-Category', '30 days'];
    $scope.locations = ['Offer Location', 'Lagos', 'Ibadan', 'Abuja', 'Kaduna', 'Enugu', 'Others'];

    // $scope.others = {

    // }


    $scope.productData = {
        productname: '',
        productAmount: '',
        duration: $scope.durations[0],
        productType: $scope.productTypes[0],
        category: $scope.categories[0],
        subCategory: $scope.subCategories[0],
        location: $scope.locations[0],
        others: {
            features: [{
                title: '',
                description: ''
            }],
            specification: [{
                title: '',
                description: ''
            }],
            offerDetails: [{
                title: '',
                description: ''
            }],
            offerConditions: [{
                title: '',
                description: ''
            }]
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


}