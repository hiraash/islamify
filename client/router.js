/**
 * The universal router for the application. All routes are defined here
 * including route related functionality. These route definitions use the
 * Iron Router by EventedMinds. 
 *
 * @author hiraash
 */


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

Router.route( '/recent', {
	name: 'recent'
});