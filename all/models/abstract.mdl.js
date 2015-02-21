/**
 * Abstract Model Class
 * 
 * This is an abstract class definition that uses the Constructor Pattern
 * and Prototypal Inheritance Pattern to create a class based OOP implementation
 * in this Meteor JS application. 
 *
 * Further detail of how this is done can be found at 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
 *
 */

Model = {};

Model.Abstract = function( owner ) {

	//The special me property. See documentation below
	this.me = this;

	//Set all the parents to have <code>this</code> as the <code>me</code>.
	var current = Object.getPrototypeOf( this );
	while ( current && (current instanceof Model.Abstract)) {
		current.me = this;
		current = Object.getPrototypeOf( current );
	}

	this._owner = owner;
	
}

Model.Abstract.prototype = {
	constructor: Model.Abstract,

	/**
	 * This is a special property that will be available to
	 * all children and parent objects. 
	 *
	 * IMPORTANT: This is the property that must be used inside prototype functions
	 * to access _private variables/functions. Example
	 * 	Wrong - this._private = val;
	 * 	Correct - this.me._private = val;
	 * 
	 * This object will always point to the current instance of the object. 
	 * This can be used at any level of the parent to access instance.
	 *
	 * ExtendingObject = function (){ 
	 * 		Abstract.call( this );
	 *
	 * 		this //points to ExtendingObject instance
	 * 		me //points to ExtendingObject instance
	 * }
	 *
	 * ExtendingObject.prototype = new Abstract();
	 * ExtendingObject.protorype.constructor = ExtendingObject;
	 *
	 * ExtedningObject.prototype.foo = function () {
	 * 		this //points to Abstract instance
	 * 		me // points to ExtendingObject instance
	 * }
	 * 
	 * @type {Abstract} Instance of a object that extends abstract.
	 */
	 me: null,

	/**
	 * The parent definition for the extending classes.
	 * 
	 * This is provide a function that will return the parent for the current instance 
	 * at any level of the ancestory tree of the extending class instances.
	 */
	 parent: function(){
	 	var parent;
	 	if ( this.constructor == Object.getPrototypeOf(this).constructor ) {
	 		parent = Object.getPrototypeOf( Object.getPrototypeOf(this) );
	 	} else {
	 		parent = Object.getPrototypeOf(this);
	 	}

	 	parent.me = this.me;

	 	return parent;

	 },

	 /**
	  * The owner of the current instance. This can be null
	  *
	  * This essentially can be used to set an owner to any instance
	  * during instantiation. Helps to get access to the owning instance.
	  * 
	  */
	 owner: function () {
	 	return this._owner;
	 },

	 /**
	  * Indicates if this instance has an owner
	  * @return {Boolean} true of owner exists
	  */
	 hasOwner: function () {
	 	return Utils.Core.isAnything(this._owner);
	 },

	 /**
	  * Extends an object based on the Constructor pattern and 
	  * the protypal inheritance pattern. One can simply call this function 
	  * on any objec that extends this object to create another instantiatable 
	  * object which contains all functions of the ancestors.
	  *
	  * Example use: 
	  * <code>
	  * 	ExtendedObject = Abstract.extend({
	  * 		foo: function() {
	  * 			...
	  *     	},
	  *      
	  * 	    bar: function() {
	  * 	    	...
	  * 	    }
	  *     })
	  *
	  * 	var obj = new ExtendedObject( param );
	  * 	if( obj.hasOwner() ){
	  * 		obj.foo();
	  * 	}
	  * 	obj.bar()
	  * </code>
	  *
	  *	The disadvantage of using this function than using the constructor pattern
	  *	directly is that, the constructor of the newly created object will be hidden.
	  *	Ideal for cases where constructor is not important
	  * 
	  * @param  {String} definition An object with the functions that need to be added
	  * @return {Object}            An object which is a constructor function
	  */
	 extend: function ( definition ) {
	 	var parent = this;
	 	var f = function() {
	 		parent.constructor.apply( this, arguments );
	 	}
	 	f.prototype = new this.constructor();
	 	f.prototype.constructor = f;
	 	f.prototype = _.extend( f.prototype, definition );
	 	return f;
	 }

};