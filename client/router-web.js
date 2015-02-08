/**
 * The universal router for the web application. All routes are defined here
 * including route related functionality. These route definitions use the
 * Iron Router by EventedMinds.
 *
 * For routing on mobile refer to router-mobile.js
 *
 * @author hiraash
 */

if( !Meteor.isCordova ){
	
	Router.configure({
		layoutTemplate: 'webLayout'
	});

	Router.route( '/', {
		name: 'home',

		onBeforeAction: function() {
			if ( Meteor.user ){
				//Figure out what to do
			} else {
				this.redirect('recent');	
			}
			
		}	
	});

	Router.route( '/recent-lectures', {
		name: 'recent',
		template: 'wRecent'
	});

}

