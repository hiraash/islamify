Template.wPlayer.helpers({
	
	active: function () {
		if ( PlayList.isActive() ){ 
			Player.activate();
		}

		return PlayList.isActive();
	}

});

