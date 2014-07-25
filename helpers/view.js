_.extend(Backbone.View.prototype, {

	/**
	 * Serializes form inputs with name attributes into a simple JavaScript object
	 * where the key is the name and the value is the input value.
	 * @param  {String} selector jQuery style selector string for selecting form
	 * @return {Object}          The serialized form data
	 */
	_serializeForm: function(selector) {
		var data = {},
			raw = this.$(selector).serializeArray();
		_.each(raw, function(pair) {
			data[pair.name] = $.trim(pair.value);
		});
		return data;
	}

});