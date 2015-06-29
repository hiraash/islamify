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
	// PlayListColl._collection.insert( {list: []} );

	/**
	 * Returns the top playlist item (currently playing item)
	 * @return {Object} lecture status
	 */
	var _top = function () {
		return PlayListColl.findOne({}, { sort: { order: 1 } });
	}

	/**
	 * Returns the bottom most playlist item
	 * @return {Object} lecutre status
	 */
	var _bottom = function () {
		return PlayListColl.findOne({}, { sort: { order: -1 } });
	}

	/**
	 * Returns all lectures that are currently in the playlist in
	 * the correct order except the first one which is playing or
	 * ready to play
	 * @return {Cursor} PlayList cursor
	 */
	var _all = function () {
		return PlayListColl.find({}, { sort: { order: 1 }, skip: 1 });
	}

	/**
	 * Indicates the lecture exists in the playlist or not
	 * @param  {String}  lectureID id of the lecture
	 * @return {Boolean}           
	 */
	var _hasLecture = function( lectureID ){
		return (PlayListColl.find({ _id: lectureID }).count() > 0);
	}

	var _isEmpty = function(){
		return (PlayListColl.find().count() == 0);
	}

	/**
	 * Add to the top of the playlist and make it the current playing item
	 * @param {String} 	lectureID lecture id
	 * @param {long} 	time      The point to start playing from(optional)
	 * @param {int} 	part      The part to start playing(optional)
	 */
	var _addToTop = function( lectureID, time, part ){
		var order = 100; //Default starting order number
		if( !_isEmpty() ){ 
			order = _top().order - 1;
		}

		//If this lecture doenst already exist in the playlist add at bottom.
		if ( !_hasLecture(lectureID) ) { 
			_addToList( lectureID, order, time, part )
		} else {
			PlayListColl._collection.update({ _id: lectureID }, { order: order });
		}
	}

	/**
	 * Add to the bottom of the playlist.
	 * @param {String} 	lectureID lecture id
	 * @param {long} 	time      The point to start playing from(optional)
	 * @param {int} 	part      The part to start playing(optional)
	 */
	var _addToBottom = function( lectureID, time, part ){
		//If nothing exists in the playlist add to top
		if( _isEmpty() ){ 
			_addToTop(lectureID, time, part)
		} else { 

			//If this lecture doenst already exist in the playlist add at bottom.
			if ( !_hasLecture( lectureID ) ) { 
				_addToList( lectureID, _bottom().order + 1, time, part )
			}
		}
	}

	/**
	 * Adds a lecture to the list
	 * @param {String} 	lectureID lecture id
	 * @param {int} 	order     the order to add in
	 * @param {long} 	time      The point to start playing from(optional)
	 * @param {int} 	part      The part to start playing(optional)
	 */
	var _addToList = function ( lectureID, order, time, part ){
		var listItem =  { _id: lectureID, order: order };

		if( time ){
			listItem.time = time;
		}

		if( part ){
			listItem.part = part;
		}

		PlayListColl._collection.insert( listItem );
	}

	return {

		isActive: function (){
			return !_isEmpty();
		},

		length: function() {
			return PlayListColl.find().count();
		},

		hasLecture: function ( lectureID ) {
			return _hasLecture( lectureID );
		},

		lectures: function () {
			return _all();
		},

		current: function(){
			return _top() != undefined ? _top()._id : null;
		},

		add: function ( lectureID ) {
			_addToBottom( lectureID );
		},

		play: function ( lectureID ) {
			_addToTop( lectureID );
			Player.reset();
			Player.play();
		}
	};

}();