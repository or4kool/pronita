pronita.controller('questionReviewCtrl', questionReviewDetail);

questionReviewDetail.$inject = ['$scope'];

function questionReviewDetail($scope){

	var qrc = this

	qrc.dropOPtion = 0;
	qrc.liClass	= 'answer-select-low';

	$scope.answerOptions = ['Select answer type (excluding the fifth question which will be a text based answer)', 'Yes Or No']

	$scope.expandMore = function() {
		if(!qrc.dropOPtion){
			console.log('got here first')
			qrc.dropOPtion = 1;

			qrc.liClass = 'answer-select-high';
			return qrc.liClass;
		}
		else{
			console.log('Got here second')
			qrc.dropOPtion = 0;
			qrc.liClass = 'answer-select-low';
			return qrc.liClass;

		}
	}

	$scope.handleOPtionsDisplay = function(){
		return qrc.liClass;
	}

	$scope.selectAnswerOption = function(position){

		console.log(position)


		// qrc.liClass += " active-answer"
		// return qrc.liClass
	}
}

