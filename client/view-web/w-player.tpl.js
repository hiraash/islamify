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

	/**
	 * For showing the tooltip for next
	 */
	nextPart: function(){
		if ( Player.hasNext() ) { 
			Meteor.defer(function(){
				$('.wp-control-next').tooltip('fixTitle');
			})
			return 'Part ' + (Player.part() + 1);
		} else {
			$('.wp-control-next').tooltip('destroy');
			return '';
		}
		
	},

	/**
	 * For showing the tooltip for the previous
	 */
	previousPart: function(){
		if ( Player.hasPrevious() ) {
			Meteor.defer(function(){
				$('.wp-control-previous').tooltip('fixTitle');
			})
			return 'Part ' + (Player.part() - 1);
		} else {
			$('.wp-control-previous').tooltip('destroy');
			return '';
		}
		
	},

	controlNext: function () {
		if( this.isMultiPart() ){
			if( !Player.hasNext() ){ 
				return 'wp-icon-disabled';
			}
		} else {
			return 'wp-icon-hidden';
		}
		return '';
	},

	controlPrevious: function () {
		if( this.isMultiPart() ){
			if( !Player.hasPrevious() ){ 
				return 'wp-icon-disabled';
			}
		} else {
			return 'wp-icon-hidden';
		}
		return '';
	},

	partTitle: function() {
		if( this.isMultiPart() ){
			return ' - Part '+ Player.part();
		}
	}


});

Template.wPlayer.events({
	
	'click .wp-control-next': function () {
		Player.next();
	},

	'click .wp-control-previous': function () {
		Player.previous();
	},

	'load .wp-speaker-image': function( event ){

		var img = $(event.target);
		if ( img.width() > img.height() ) {
			img.width("100%");
		} else {
			img.height("100%");
		}

	}

});

