Backbone.Model.prototype.defaultSet = Backbone.Model.prototype.set;

_.extend(Backbone.Model.prototype, {

  /**
   * Adds schema type casting to models before setting attributes
   * @param {Object|String}    key     The key of the value to set or an object of value pairs
   * @param {String|Object}    val     The value to set or the options object
   * @param {Object|undefined} options The options for saving or undefined
   */
  set: function(key, val, options) {

    var attrs;

    if (typeof key === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    if (this.schema) {
      _.each(attrs, _.bind(function(v, k) {
        try {
          switch (this.schema[k]) {
            case 'boolean':
              attrs[k] = v === 'true' ? true : v === 'false' ? false : v;
              break;
            case 'int':
              attrs[k] = parseInt(v, 10);
              break;
            case 'float':
              attrs[k] = parseFloat(v);
              break;
            case 'string':
              attrs[k] = v.toString();
              break;
            default:
              attrs[k] = v;
              break;
          }
        } catch (error) {}
      }, this));
    }

    this.defaultSet.call(this, attrs, options);
  }

});