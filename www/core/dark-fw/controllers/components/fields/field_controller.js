steal(
    '../../../models/components/fields/field.js',
    '../box_component_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Fields.FieldController
         * @alias FieldController
         * @inherits Dark.Controllers.Components.BoxComponentController
         * @parent Dark.Controllers.Components.BoxComponentController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.BoxComponentController("Dark.Controllers.Components.Fields.FieldController",
            /* @Static */
            {//Static
                tmpl:{
                    fieldWrapper: 'fields/fieldWrapper.ejs'
                },

                css:{
                    label: "control-label",
                    group: "control-group",
                    container: "controls",
                    errorContainer: "dark-error-container",
                    help: "help",
                    alert: "alert alert-error",
                    error: "error"
                }
            },
            /* @Prototype */
            {//Prototype
                getContainerElement: function(){
                    return $('> .'+this.getCss('container'), this.element);
                },

                getErrorElement: function(){
                    return $('> .'+this.getCss('errorContainer'), this.getContainerElement());
                },

                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                /**
                 * Возвращает элемент внутрь которого необходимо отрисовать основной шаблон компонента
                 * @private
                 */
                _getRenderElement: function(){
                    return $('> .'+this.getCss('container'), this.element);
                },

                /**
                 * Добавляет полученный шаблон в элемент отрисовки
                 * @private
                 */
                _renderElement: function(tmpl){
                    this._getRenderElement().prepend(tmpl);
                },

                /**
                 * Рендерит шаблон и передает в него параметры
                 * @protected
                 * @see Dark.Controllers.Controller:_getRenderParams
                 */
                _renderTemplate:function () {
                    var me = this;
                    me.element.html(me._getRenderView(me.Class.tmpl.fieldWrapper, me._getRenderParams()));
                    me._super();
                },

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        value           : 'valueChange',
                        errors          : 'errorsChange',
                        _errorVisible   : 'errorVisibleChange'
                    });
                },

                _updateErrorsText: function(){
                    this.getErrorElement().html("<ol><li>"+this.component.errors().join('</li><li>')+"</li></ol>");
                },

                _updateErrorVisible: function(){
                    var me = this,
                        el = me.element,
                        error = me.getCss('error'),
                        errorVisible = me.component._errorVisible();

                    me.getErrorElement()[errorVisible ? 'show' : 'hide']();

                    if( errorVisible && !el.hasClass(error) ){
                        el.addClass(error);
                    }
                    if( !errorVisible && el.hasClass(error) ){
                        el.removeClass(error);
                    }
                },


                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this;
                    me._super();
                },

                valueChange: $.noop,

                errorsChange: function(event, value){
                    this._updateErrorsText();
                },

                errorVisibleChange: function(event, value){
                    this._updateErrorVisible();
                },

                destroy:function () {
                    var me = this;
                    me._super();
                }

            }
            //!steal-remove-start
            /* @Getters */
            , {}
            /* @Setters */
            , {}
            //!steal-remove-end
        );
    }
);