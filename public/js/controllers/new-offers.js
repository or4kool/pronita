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
        img: ['../img/add-plus.png']
    }

    $scope.imgUploadNums = [];

    nofc.allImgs = []


    var imgNum = '';
    var countCheck = 0;

    $scope.uploadProdImg = function() {

        if(countCheck < 1){
            imgNum = ($scope.uploadUrl.img.length)-1;
            var theNum = 0;
        }
        for (var i = imgNum; i > theNum; i--) {
            
            var fData = new FormData();


            var imgBlob = nofc.dataUri($scope.uploadUrl.img[i]);
            fData.append('files', ($scope.uploadUrl.img[i]));
            fData.append('files', imgBlob);
            
            var url = '/upload'

            var sendImg = mainService.imgPoster(fData, url);
            sendImg.then(function(result) {
                console.log('====================================');
                console.log(result);
                if (result[i]){
                    nofc.allImgs.push(result[i].filename);
                }
                console.log(nofc.allImgs);
                console.log('====================================');
                countCheck = 1;
                $scope.uploadProdImg();

                // MOVE TO THE PRODUCT UPLOAD PART
                if(i == 0 && result){
                    mainService.setImg(nofc.allImgs);
                    $location.path('/new-offer1')
                }
                 
            })
        }
    }

    $scope.imgFile = function(imag) {
        return imag;
    }

    nofc.doUplodNum = function(num) {
        num = num - 1
        for (var i = 0; num >= i; num--) {
            $scope.imgUploadNums.push(num)
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
}