steal.then(function() {
	/**
	 * @class DocumentJS.types.getters
	 * @tag documentation
	 * @parent DocumentJS.types
	 * Sets the following functions and attributes to be added to Class or Constructor prototype (instance) functions.
	 * 
	 * ###Example
	 * 
	 * @codestart
	 * $.Controller.extend('Cookbook.Controllers.Recipe',
	 * /* @Static *|
	 * {
	 *    onDocument: true
	 * },
	 * /* @Getters *|
	 * {
	 *  /**
	 *   * When the page loads, gets all recipes to be displayed.
	 *   *|
	 *   load: function(){
	 *      if(!$("#recipe").length) 
	 *          $(document.body).append($('&lt;div/&gt;').attr('id','recipe'))
	 *      Cookbook.Models.Recipe.findAll({}, this.callback('list'));
	 *    },
	 *    ...
	 * @codeend
	 */
	DocumentJS.Type("getters",
/*
 * @Static
 */
	{
/*
	 * @return {Object} getters data.
	 */
		code: function() {
			return {
				name: "getters"
			}
		},
/*
	 * Possible scopes for @getters.
	 */
		parent: /class/,
		useName: true,
		hasChildren: true
	})
})