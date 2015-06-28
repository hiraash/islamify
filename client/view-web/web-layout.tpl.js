Template.webLayout.helpers({

	playerActive: function () {
		if ( PlayList.isActive() ){
			return 'col-sm-8';
		} else {
			return '';
		}
	}
	
});