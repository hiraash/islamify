/**
 * 
 */

Template.wLecture.events({
	'click .lecture-play': function () {
		PlayList.play( this.lectureID() );
	},

	'click .lecture-add': function () {
		PlayList.add( this.lectureID() );
	},

	'load .lecture-image': function( event ){

		var img = $(event.target);
		if ( img.width() > img.height() ) {
			img.width("100%");
		} else {
			img.height("100%");
		}

	}
});