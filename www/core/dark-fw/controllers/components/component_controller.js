steal(
    '../../models/components/component.js',
    '../controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.ComponentController
         * @alias Controller
         * @inherits Dark.Controllers.Controller
         * @parent Dark.Controllers.Controller
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Controller("Dark.Controllers.Components.ComponentController",
            /* @Static */
            {//Static
                tmpl: {},

                css: {}
            },
            /* @Prototype */
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
                        css     : "cssChange",
                        styles  : "stylesChange",
                        visible : { name: "visibleChange", auto: false }
                    });
                },

                cssChange: function (event, cssCollection) {
                    var me = this,
                        element = me.element,
                        css = me.component.cssToSting();

                    if( css ){
                        css = me.getSysCssClass() + ' ' + css;
                        element.removeClass($.data(element[0], 'cssClass')).addClass(css);
                        $.data(element[0], 'cssClass', css );
                    }
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
                    this.element.css('visible', [this.component.visible() ? 'visible' : 'hidden']);
                }

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/

            }
        );
    }
);