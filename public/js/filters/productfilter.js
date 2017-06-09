pronita.filter('topFreeProduct', ['mainService', function(mainService){
	
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