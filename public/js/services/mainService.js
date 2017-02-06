pronita.service('mockService', ['$http','$q',function($http,$q){

	var deffered = $q.defer();
		
	this.poster = function(sendData, url){

		$http({
				method: 'POST',
				url: url,
				data: sendData,
				headers : {'Content-Type': 'application/json'}

		}).then(function successCallback(response){

				// console.log(response.data.error);
				deffered.resolve(response.data);

				// console.log(deffered.promise);

		}, function errorCallback(response){

		});

		return deffered.promise;
	};


}]);