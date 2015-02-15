Template.wPlayer.helpers({
	
	active: function () {
		// return (PlayList.find().count() > 0);	
		return true;
	}

});

Template.wPlayer.rendered = function () {
	
    $("#jp-control").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
				title: "http://localhost:3000/audio.mp3",
				mp3: "http://localhost:3000/audio.mp3"
            });

        },
        timeupdate: function(event) {
        	if( event.jPlayer.status.currentPercentAbsolute > 0 ) {
	        	$(".wp-play-handle").css("display", "inline");
				$(".wp-play-handle").css("left", event.jPlayer.status.currentPercentAbsolute + "%");
			} else {
				$(".wp-play-handle").css("display", "none");
			}
		},
		volumechange: function(event) {
        	if( event.jPlayer.options.volume > 0 && !event.jPlayer.options.muted ) {
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
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
    });


};

Template.wPlayer.events({
	'click .wp-seek-bar': function ( event ) {
		var $bar = $(event.currentTarget),
			offset = $bar.offset(),
			x = event.pageX - offset.left,
			w = $bar.width(),
			p = 100 * x / w;

		$("#jp-control").jPlayer( "playHead", p );
	}
});