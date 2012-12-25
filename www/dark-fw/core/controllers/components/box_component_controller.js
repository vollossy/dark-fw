steal(
    '../../models/components/box_component.js',
    './component_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.BoxComponentController
         * @inherits Dark.Controllers.Components.ComponentController
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Controllers.Components.ComponentController("Dark.Controllers.Components.BoxComponentController",
            {//Static
                tmpl:{},

                css:{}
            },
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        width : "widthChange",
                        height : "heightChange"
                    });
                },

                widthChange:function (event, element) {
                    var me = this,
                        width = me.component.getWidth();

                    if( width != 'auto' ) me._getCurrentElement().width(width);
                },

                heightChange:function (event, element) {
                    var me = this,
                        height = me.component.getHeight();

                    if( height != 'auto' ) me._getCurrentElement().height(height);
                },

                _getCurrentElement: function(){
                    return this.element;
                },
                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this;
                    me._super();
                    me.widthChange();
                    me.heightChange();
                },

                destroy:function () {
                    var me = this;
                    me._super();
                }

            }
        );
    }
);