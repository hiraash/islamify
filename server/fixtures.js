Meteor.startup(function (){
	// Lecture.remove({});
	// Speaker.remove({});

	if ( Lecture.find().count() == 0 ){

		var spID = Speaker.insert({ 
			name: 'Mufti Ismail Menk',
			nationality: 'Zimbabwe',
			picture: '1.jpg',
			bio: 'He is a student of knowledge trying to disseminate the Deen in the current age.',
			facebookPage: 'https://www.facebook.com/muftimenk',
			website: 'http://www.muftimenk.com/',
			createdBy: '',
			createdOn: new Date()
		});

		Lecture.insert({
			title : 'Ego And Fame  - “Nose In the Air, Feet Off The Ground”',
			audio: [{
				file: '1',
				type: 'mp3',
				contentType: 'audio/mp3',
				length: 4346
			}],
			speakerID: spID,
			location: '',
			lecturedOn: '',
			language: 'English',
			tags: [ 'pride','ego','simplicity' ],
			length: 4346,
			listens: 0,
			lastListenedOn: 0,
			uploadedBy: null,
			uploadedOn: null
		});

		Lecture.insert({
			title : 'Sadaqa Ja- Riyah Best Returns On Invesment',
			audio: [{
				file: '3',
				type: 'mp3',
				contentType: 'audio/mp3',
				length: 2202
			}],
			speakerID: spID,
			location: '',
			lecturedOn: '',
			language: 'English',
			tags: [ 'sadaqa','jummah','investment','dunya' ],
			length: 2202,
			listens: 0,
			lastListenedOn: 0,
			uploadedBy: null,
			uploadedOn: null
		});

		spID = Speaker.insert({ 
			name: 'Mufthi Yoosuf Haniffa',
			nationality: 'Sri Lanka',
			picture: '2.jpg',
			bio: 'He is a prominent and respected Islamic scholar in Sri Lanka.',
			facebookPage: '',
			website: '',
			createdBy: '',
			createdOn: new Date()
		});

		Lecture.insert({
			title : 'Nikha and Family Life',
			audio: [{
				file: '2',
				type: 'mp3',
				contentType: 'audio/mp3',
				length: 7921
			},{
				file: '4',
				type: 'mp3',
				contentType: 'audio/mp3',
				length: 8803
			}],
			speakerID: spID,
			location: '',
			lecturedOn: '',
			language: 'Tamil',
			tags: [ 'nikha','family','marriage','wedding' ],
			length: 7921,
			listens: 0,
			lastListenedOn: 0,
			uploadedBy: null,
			uploadedOn: null
		});


	}

});