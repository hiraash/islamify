/**
 * Application level functionality for the 
 * client side app.
 */
App = function(){

	var self = this;
	
	return {

		/**
		 * HTTP.post method wrapper for calling HTTP Methods on
		 * server side. This functionality is a core requirement 
		 * of the application. This method mainly handles the error 
		 * scenario. 
		 *
		 * For more details on the use of this function see cfs:http-methods
		 * package - https://github.com/CollectionFS/Meteor-http-methods
		 */
		call: function(){
			var callback;
			var i = 0;
			for(; i<arguments.length; i++){
				if ( _.isFunction( arguments[i] ) ){
					callback = arguments[i];
					break;
				}
			}
			arguments[i] = function( error, result ){
				if( error ){
					console.log( error );
				} else {
					callback.call( this, result, error );
				}
			}
			
			HTTP.post.apply( HTTP, arguments );
	
		},

		/**
		 * Indicates if the app is running in developer environment
		 * @return {Boolean} 
		 */
		isDevelopment: function(){
			return Settings.isDevelopment;
		},

		isMobile: function(){

		}
	};

}(); 