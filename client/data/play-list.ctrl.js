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

	/**
	 * Adds a lecture to the top or bottom. considers existing
	 * items as well.
	 * @param {String} lectureID The lecture
	 * @param {Boolean} top      True to add to the top. If item already
	 *                           exists, it will be moved to top
	 */
	var addToList = function( lectureID, top ) {
		if ( PlayListColl.find({ list: lectureID }).count() == 0 ) { 
			var obj = PlayListColl.findOne();

			if (top){ 
				obj.list.unshift( lectureID );
			} else { 
				obj.list.push( lectureID );
			}

			PlayListColl._collection.update({_id: obj._id}, { $set:{ list: obj.list } });

		} else if (top) {
			var obj = PlayListColl.findOne();
			
			var i = obj.list.indexOf( lectureID );
			obj.list.splice(i, 1);
			obj.list.unshift( lectureID );

			PlayListColl._collection.update({_id: obj._id}, { $set:{ list: obj.list } });
		}
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

		current: function(){
			return PlayListColl.findOne().list[0];
		},

		add: function ( lectureID ) {
			addToList( lectureID );
		},

		play: function ( lectureID ) {
			addToList( lectureID, true )
			Player.play();
		}

	};

}();