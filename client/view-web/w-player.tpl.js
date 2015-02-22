Template.wPlayer.helpers({
	
	active: function () {
		if ( PlayList.isActive() ){ 
			Player.activate();
		}

		return PlayList.isActive();
	},

	lecture: function(){
		return Player.lecture();
	},

	multiFile: function () {
		if( this.isMultiPart() ){
			return 'wp-icon-disabled';
		} else {
			return 'wp-icon-hidden';
		}
	}


});

