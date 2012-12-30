steal(
    '../../../models/components/buttons/button.js',
    '../box_component_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Buttons.ButtonAbstractController
         * @alias ButtonAbstractController
         * @inherits Dark.Controllers.Components.BoxComponentController
         * @parent Dark.Controllers.Components.BoxComponentController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.BoxComponentController("Dark.Controllers.Components.Buttons.ButtonAbstractController",
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
                rootElement: function(){
                    return this.element;
                },
                /**
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        text    : "textChange",
                        display : "displayChange",
                        scale   : "scaleChange",
                        disabled: "disabledChange"
                    });
                },

                /**
                 * Callback реагирующий на изменение свойства компонента display
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} display Значение свойства компонента display
                 * @return {Button}
                 */
                displayChange:function (event, display) {
                    var me = this;
                    me.rootElement()[(me.component.isBlock() ? "add" : "remove") + 'Class']('btn-block');
                    return me;
                },

                /**
                 * Callback реагирующий на изменение свойства компонента scale
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} scale Значение свойства компонента scale
                 * @return {Button}
                 */
                scaleChange:function (event, scale) {
                    var me = this,
                        scales = ['Mini', 'Small', 'Default', 'Large'],
                        oneScale,
                        i = 0, cnt = scales.length;

                    for( ; i != cnt; ){
                        oneScale = scales[i++];
                        me.rootElement()[(me.component['is'+oneScale]() ? "add" : "remove") + 'Class']('btn-' + oneScale.toLowerCase());
                    }

                    return me;
                },

                /**
                 * Callback реагирующий на изменение свойства компонента disabled
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} scale Значение свойства компонента disabled
                 * @return {Button}
                 */
                disabledChange:function (event, disabled) {
                    return this.rootElement()[(disabled ? 'add' : 'remove') + 'Class']('disabled');
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