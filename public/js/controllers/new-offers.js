pronita.controller('newOfferCtrl', newOfferDetail);

newOfferDetail.$injector = ['$scope', 'mainService', '$location'];

function newOfferDetail($scope, mainService, $location) {

    var nofc = this

    // $scope.uploadUrl = {
    //     img: ['../img/add-plus.png']
    // }

    $scope.uploadUrl = {
        img: []
    }

    $scope.uploadUrled = {
        img: []
    }

    $scope.imgUploadNums = [];

    nofc.allImgs = []


    var imgNum = '';
    var countCheck = 0;

    $scope.uploadProdImg = function() {
console.log($scope.uploadUrl.img);
        if(countCheck < 1){
            imgNum = ($scope.uploadUrl.img.length);
            var theNum = 0;
        }
        for (var i = (imgNum); i > theNum; i--) {
            
            var fData = new FormData();


            // var imgBlob = nofc.dataUri($scope.uploadUrl.img[(i-1)]);
            // fData.append('files', ($scope.uploadUrl.img[(i-1)]));
            fData.append('files', $scope.uploadUrl.img[(i-1)]);
            // fData.append('files', imgBlob);
            
            var url = '/upload'

            // console.log(imgBlob);

            // var newName = mainService.bolbToImg(fData, "name" + i + ".jpg");
            // console.log(newName);

            var sendImg = mainService.imgPoster(fData, url);
            sendImg.then(function(result) {
                console.log(result);
                if (result[i]){
                    
                    // nofc.allImgs.push(newName);
                    nofc.allImgs.push(result[i].filename);
                }
                countCheck = 1;
                $scope.uploadProdImg();

                // MOVE TO THE PRODUCT UPLOAD PART
                if(i == 0 && result){
                    mainService.setImg(nofc.allImgs);
                    $location.path('/new-offer1')
                }
                 
            })
        }
        console.log(nofc.allImgs);
    }

    $scope.imgFile = function(imag) {
        return imag;
    }

    nofc.doUplodNum = function(num) {
        // num = num - 1
        // for (var i = 0; num >= i; num--) {
        //     $scope.imgUploadNums.push(num)
        // }

        for (var i=0; i < num; i++){
            $scope.imgUploadNums.push(i)
        }
    }

    nofc.doUplodNum(4);


    nofc.dataUri = function(dataUri) {

        if (dataUri){
            var dataBinary = atob(dataUri.split(',')[1]);
            var dataMimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
            var dArray = [];

            for (var i = 0; i < dataBinary.length; i++) {
                dArray.push(dataBinary.charCodeAt(i));
            }

            // console.log(dArray);

            return new Blob([new Uint8Array(dArray)], { type: dataMimeString });
        }
        
    }

    // CLOSE SELECTED IMAGE
    $scope.closeImg = function(index){
        console.log(index)
        console.log($scope.uploadUrled)
        console.log($scope.uploadUrled.img[0])
        $scope.uploadUrled.img.splice(index,1)
        // $scope.uploadUrled.img[index] = '';
    }

    // GET USER INFORMATION
    // $scope.userInfo = function(){
    //     nofc.allUserInfo = minService.userInfo;
    // }

    nofc.userData = function(){
        console.log(mainService.getUserData())
        $scope.loggedUserData = mainService.getUserData();

        // CHECK IF IT HAS TEST PRODUCT OR A STARTUP
        $scope.loggedUserData.userTests = (Array.isArray($scope.loggedUserData.userTests)) ? $scope.loggedUserData.userTests.length : $scope.loggedUserData.userTests;
        $scope.loggedUserData.userProducts = (Array.isArray($scope.loggedUserData.userProducts)) ? $scope.loggedUserData.userProducts.length : $scope.loggedUserData.userProducts;

        return $scope.loggedUserData;
    }

    // INVOKE FUNCTION

    nofc.userData();
}