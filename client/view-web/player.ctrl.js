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
	var _lecture;
	var _part = 0;


	var setMedia = function(){
		if( _lecture ){
            $(player).jPlayer("setMedia", {
				title: _lecture.title() + ' by ' + _lecture.speaker().name(),
				mp3: 'http://localhost:3000/' + _lecture.file()
            });
		}
	}

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
							setMedia();

							if( _playOnReady ){
								$(player).jPlayer("play");	
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

		set: function( lectureID ){
			_lecture = Lecture.findOne({ _id: lectureID });

			if ( _ready ) {
				setMedia();
			}
		},

		play: function() {
			if( _ready ){
				$(player).jPlayer("play");
			} else {
				_playOnReady = true;
			}
		},

		next: function(){

		},

		previous: function() {

		}
	};

}();