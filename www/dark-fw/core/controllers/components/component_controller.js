steal(
    '../../models/components/component.js',
    '../controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.ComponentController
         * @inherits Dark.Controllers.Controller
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Controllers.Controller("Dark.Controllers.Components.ComponentController",
            {//Static
                tmpl: {},

                css: {}
            },
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                /**
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        id      : "idChange",
                        css     : "cssChange",
                        styles  : "stylesChange",
                        visible : "visibleChange"
                    });
                },


                idChange: function (event, element) {
                    var me = this;
                    me.element.attr('id', me.component.id());
                },

                cssChange: function (event, element) {
                    var me = this,
                        css = me.component.cssToSting();
                    if( css ) me.element.addClass();
                },

                stylesChange: function (event, element) {
                    var me = this,
                        el = me.element,
                        style = me.component.stylesToSting();

                    if( !!style ){
                        el.attr('style', style);
                    }else{
                        el.removeAttr('style');
                    }
                },

                visibleChange:  function (event, element) {
                    this.element[ this.component.visible() ? 'show' : 'hide']();
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render: function () {
                    var me = this;
                    me._super();
                    me.idChange();
                    me.cssChange();
                    me.stylesChange();
                    me.visibleChange();
                },

                destroy:function () {
                    var me = this;
                    me._super();
                }

            }
        );
    }
);