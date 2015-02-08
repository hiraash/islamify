Template.wPlayer.helpers({
	
	active: function () {
		return (PlayList.find().count() > 0);	
	}

});