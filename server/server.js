Server = function(){
	var env = process.env.NODE_ENV;

	return {

		/**
		 * Specifies if the app is running in production
		 * or development based on process.env.
		 * @return {Boolean} 
		 */
		isDevelopment: function(){
			return env == 'development';
		}

	};

}();

Meteor.methods({
	isDevelopment: function(){
		return Server.isDevelopment();
	}
})