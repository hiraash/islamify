Player = function() {

	var player = "#jp-control";

	/**
	 * Flag to determine if the jPlayer has been activated.
	 * @type {Boolean}
	 */
	var _activated = false;
	var _ready = false;
	var _playOnReady = false;

	/**
	 * The current active lecture in the player.
	 */
	var _lecture = function(){
		return Lecture.findOne({ _id: PlayList.current() });
	};
	/**
	 * The part of the lecure that is current.
	 * Only applies to lecture with multiple files
	 * @type {Number}
	 */
	var _part = 'player-part';
	Session.set( _part, 0 );

	var _setMedia = function(){
		if( _lecture() ){
            $(player).jPlayer("setMedia", {
				mp3: Settings.storageServiceUrl + Settings.buckets.lecture + '/' + _lecture().file( Session.get(_part) )
            });
		}
	};

	var _play = function() {
		$(player).jPlayer("play");
	};

	Tracker.autorun( function(){
		//The conditions on this line are mostly to trigger reactivity when 
		//these values change
		if( PlayList.current() && Session.get(_part) >= 0 && _ready ){
			_setMedia();
			_play();
			console.log( "PlayList.current()" );
		}
	});

	return {

		/**
		 * Private function to activate the jPlayer for the first
		 * time. Controls the run only for one time.
		 */
		activate: function () {

			if( !_activated ) { 

				var timer = Meteor.setInterval( function(){ 

				    $(player).jPlayer({
				        ready: function(event) {
				        	_ready = true;
							_setMedia();

							if( _playOnReady ){
								_play();	
								_playOnReady = false;
							}
				        },

				        timeupdate: function(event) {
				        	if( event.jPlayer.status.currentPercentAbsolute > 0 && event.jPlayer.status.currentPercentAbsolute < 100 ) {
					        	$(".wp-play-handle").css("display", "inline");
								$(".wp-play-handle").css("left", event.jPlayer.status.currentPercentAbsolute + "%");
							} else {
								$(".wp-play-handle").css("display", "none");
							}
						},
						volumechange: function(event) {
				        	if( !event.jPlayer.options.muted ) {
					        	$(".wp-volume-handle").css("display", "inline");
								$(".wp-volume-handle").css("left", (event.jPlayer.options.volume * 100) + "%");
							} else {
								$(".wp-volume-handle").css("display", "none");
							}
						},
				        swfPath: "http://jplayer.org/latest/dist/jplayer",
				        supplied: "mp3, oga",
						wmode: "window",
						useStateClassSkin: true,
						autoBlur: false,
						keyEnabled: true,
						remainingDuration: true,
						toggleDuration: true,
						timeFormat: {
							showHour: true,
							showMin: true,
							showSec: true
						}
				    });

					$(".wp-seek-bar").slider({
						max: 100,
						min: 0,
						slide: function( event, ui ){
							$("#jp-control").jPlayer( "playHead", ui.value );
						}
					});

					$(".wp-volume-bar").slider({
						max: 1,
						min: 0,
						step: .01,
						slide: function( event, ui ){
							$("#jp-control").jPlayer( "volume", ui.value );
						}
					});

					

					Meteor.clearTimeout(timer);

				}, 10 ); //Meteor.setInterval

				_activated = true;
			}
		},

		lecture: function() {
			return _lecture();
		},

		play: function() {
			if( _ready ){
				_play();
			} else {
				_playOnReady = true;
			}
		},

		part: function() {
			return Session.get(_part) + 1;
		},

		reset: function() {
			return Session.set(_part, 0);
		},

		hasNext: function(){
			return this.part() < _lecture().noOfParts();
		},

		hasPrevious: function() {
			return this.part() > 1;
		},

		next: function(){
			if( this.hasNext() ){
				Session.set(_part, Session.get(_part) + 1 );
			}
		},

		previous: function() {
			if( this.hasPrevious() ){
				Session.set(_part, Session.get(_part) - 1 );
			}
		}
	};

}();