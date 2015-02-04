/**
 * The application global
 */
App = function(){

	var isDev;
	Meteor.call('isDevelopment', function( error, result ){
		isDev = result;
	});

	//Disconnect DDP if the env is not dev
	Meteor.startup( function(){
		if( Meteor.status().connected && !isDev ){
			Meteor.disconnect();
		}
	});
	
	return {

		/**
		 * Indicates if the app is running in developer environment
		 * @return {Boolean} 
		 */
		isDevelopment: function(){
			return isDev;
		},

		isMobile: function(){

		}
	};

}(); 