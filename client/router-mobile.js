/**
 * The universal router for the mobile application. All routes are defined here
 * including route related functionality. These route definitions use the
 * Iron Router by EventedMinds.
 *
 * For routing on web app refer to router-web.js
 *
 * @author hiraash
 */

if( Meteor.isCordova ){

	Router.configure({
		layoutTemplate: 'mobileLayout'
	});

	Router.route( '/', {
		name: 'home',

	});

}

