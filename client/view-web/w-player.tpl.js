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