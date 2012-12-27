steal(
    '../../models/components/box_component.js',
    './component_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.BoxComponentController
         * @alias BoxComponentController
         * @inherits Dark.Controllers.Components.ComponentController
         * @parent Dark.Controllers.Components.ComponentController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.ComponentController("Dark.Controllers.Components.BoxComponentController",
            /* @Static */
            {//Static
                tmpl:{},

                css:{}
            },
            /* @Prototype */
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
                        width = me.component.widthToString();

                    if( width != 'auto' ) me._getCurrentElement().width(width);
                },

                heightChange:function (event, element) {
                    var me = this,
                        height = me.component.heightToString();

                    if( height != 'auto' ) me._getCurrentElement().height(height);
                },

                _getCurrentElement: function(){
                    return this.element;
                }
                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/

            }
        );
    }
);