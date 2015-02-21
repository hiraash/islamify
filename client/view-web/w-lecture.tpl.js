/**
 * 
 */

Template.wLecture.events({
	'click .lecture-play': function () {
		PlayList.play( this.lectureID() );
	},

	'click .lecture-add': function () {
		PlayList.add( this.lectureID() );
	}
});