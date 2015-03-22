/**
 * The model class for the Speaker data taken from the Speaker collection
 *
 * 
 */

Model.Speaker =  function ( data, owner ) {
	Model.Abstract.call( this, owner );

	this._data = data;

}

Model.Speaker.prototype = new Model.Abstract();
Model.Speaker.prototype.constructor = Model.Speaker;

Model.Speaker.prototype.name = function() {
	return this._data.name;
}

Model.Speaker.prototype.picture = function() {
	return this._data.picture;
}

Model.Speaker.prototype.pictureUrl= function() {
	return Settings.storageServiceUrl + Settings.buckets.speakerPic + '/' + this.picture();
}