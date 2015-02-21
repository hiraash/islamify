/**
 * The playlist on the client side.
 */

PlayList = function(){
	
	/**
	 * Collection that stores the client side details of a playlist.
	 * This is the playlist that shows up on the app. This could be
	 * associated to the user or not. 
	 * 
	 * @type {Mongo Collection}
	 */
	var PlayListColl = new Meteor.Collection('playlist');
	PlayListColl._collection.insert( {list: []} );

	var addList = function( lectureID ) {
		var obj = PlayListColl.findOne();
		obj.list.push( lectureID );
		PlayListColl._collection.update({_id: obj._id}, { $set:{ list: obj.list } });
	}

	return {

		isActive: function (){
			return (this.length() > 0);
		},

		length: function() {
			return PlayListColl.findOne().list.length;
		},

		hasLecture: function ( lectureID ) {
			return (PlayListColl.find({ list: lectureID }).count() > 0);
		},

		add: function ( lectureID ) {
			if ( !this.hasLecture( lectureID ) ){
				addList( lectureID );

				if ( this.length() == 1 ){
					Player.set( lectureID );
				}
			}
		},

		play: function ( lectureID ) {
			this.add( lectureID );
			Player.set( lectureID );
			Player.play();
		}

	};

}();