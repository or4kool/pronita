pronita.controller('newOfferCtrl', newOfferDetail);

newOfferDetail.$injector = ['$scope', 'mainService'];

function newOfferDetail($scope, mainService) {

    var nofc = this

    // $scope.uploadUrl = {
    //     img: ['../img/add-plus.png']
    // }

    $scope.uploadUrl = {
        img: ['../img/add-plus.png']
    }

    $scope.imgUploadNums = []


    $scope.uploadProdImg = function() {
        for (var i = 0; i < uploadUrl.img.length; i++) {

            console.log(i + ">> " + $scope.uploadUrl.img[i])
            var fData = new FormData();


            var imgBlob = nofc.dataUri($scope.uploadUrl.img[i]);
            fData.append('files', imgBlob);
            console.log(i + ">> " + imgBlob.path);
            var url = '/upload'

            var sendImg = mainService.imgPoster(fData, url);
            sendImg.then(function(result) {
                console.log(i + ">> " + result);
            })
        }
    }

    $scope.imgFile = function(imag) {
        return imag;
    }

    nofc.doUplodNum = function(num) {
        num = num - 1
        for (var i = 0; num >= i; num--) {
            // console.log(num);
            $scope.imgUploadNums.push(num)
        }
    }

    nofc.doUplodNum(4);


    nofc.dataUri = function(dataUri) {
        var dataBinary = atob(dataUri.split(',')[1]);
        var dataMimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
        var dArray = [];

        for (var i = 0; i < dataBinary.length; i++) {
            dArray.push(dataBinary.charCodeAt(i));
        }

        return new Blob([new Uint8Array(dArray)], { type: dataMimeString });
    }
}