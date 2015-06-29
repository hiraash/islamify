Template.wPlayList.helpers({
	
	active: function () {
		return PlayList.isActive();
	},

	lectures: function () {
		return PlayList.lectures();
	},

	lecture: function () {
		return Lecture.findOne({ _id: this._id });
	}

});

Template.wPlayList.events({

	'load .wp-pli-image': function( event ){

		var img = $(event.target);
		if ( img.width() > img.height() ) {
			img.width("100%");
		} else {
			img.height("100%");
		}

	}

});