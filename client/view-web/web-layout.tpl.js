Template.webLayout.helpers({

	playerActive: function () {
		if ( PlayList.find().count() > 0 ){
			return 'g-footer-bump';
		}
	}
	
});