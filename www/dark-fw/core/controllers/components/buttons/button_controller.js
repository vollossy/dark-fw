steal(
    './../../../models/components/buttons/button.js',
    './../box_component_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Buttons.ButtonController
         * @inherits Dark.Controllers.Components.BoxComponentController
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Controllers.Components.BoxComponentController("Dark.Controllers.Components.Buttons.ButtonController",
            {//Static
                tmpl:{
                    component: 'buttons/button.ejs'
                },

                css:{
                    btn: 'dark-btn'
                }
            },
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                /**
                 *
                 * @param el
                 * @param options
                 * @return {jQuery|HTMLElement}
                 */
                _replaceRootElement: function(el, options){
                    var btn = 'btn',
                        css = this.getCss(btn) + ' ' + btn;
                    return $('<button class="'+css+'"></button>');
                },

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        text : "textChange"
                    });
                },

                textChange:function (event, element) {
                    var me = this;
                    me.element.text(me.component.text());
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this;
                    me._super();
                    me.textChange();
                },

                destroy:function () {
                    var me = this;
                    me._super();
                }

            }
        );
    }
);