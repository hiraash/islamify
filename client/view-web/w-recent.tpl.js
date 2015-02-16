/**
 * 
 */

Template.wRecent.helpers({
	lectures: function(){
		return Lecture.find();
	}

})