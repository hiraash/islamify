/**
 * Collection that stores details of a Speaker
 * @type {Meteor Collection}
 *
 *   - _id
 *   - salutation
 *   - name
 *   - nationality
 *   - picture
 *   - bio
 *   - facebookPage
 *   - website
 *   - validatedUserId
 *   - createdBy
 *   - createdOn
 */
Speaker = new Meteor.Collection('speaker', {
	transform: function( doc ){
		return new Model.Speaker( doc );
	}
});


/**
 * Collection that stores the details of a lecture
 * @type {Mongo Collection}
 *
 *	- _id
 *	- audio []
 *	 	- file
 *		- type
 *		- contentType
 *		- length
 *	- title 
 *	- speakerID
 *	- location
 *	- lecturedOn
 *	- language
 *	- tags []
 *	- length
 *	- ratings []
 *		- user
 *		- rating
 *	- listens
 *	- lastListenedOn
 *	- uploadedBy
 *	- uploadedOn
 */
Lecture = new Meteor.Collection('lecture', {
	transform: function( doc ){
		return new Model.Lecture( doc );
	}
});

