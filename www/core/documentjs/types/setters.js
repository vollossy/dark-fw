steal.then(function() {
	/**
	 * @class DocumentJS.types.setters
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
	 * /* @Setters *|
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
	DocumentJS.Type("setters",
/*
 * @Static
 */
	{
/*
	 * @return {Object} setters data.
	 */
		code: function() {
			return {
				name: "setters"
			}
		},
/*
	 * Possible scopes for @setters.
	 */
		parent: /class/,
		useName: true,
		hasChildren: true
	})
})