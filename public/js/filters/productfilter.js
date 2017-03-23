pronita.filter('topFreeProduct', ['dataFetcher', function(dataFetcher){
	
	return function(input, partType){

		var goOut = [];
		var theData = '';

		angular.forEach(input, function(aSome) {
			if (aSome.part === partType){
				goOut.push(aSome);
			}
		});

		return goOut;
	}

}]);