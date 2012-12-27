steal(
    '../../../models/components/buttons/button.js',
    '../box_component_controller.js',
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
                        text : "textChange",
                        display: "displayChange",
                        scale: "scaleChange"
                    });
                },

                /**
                 * Callback реагирующий на изменение свойства компонента display
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} text Значение свойства компонента text
                 * @return {Button}
                 */
                textChange:function (event, text) {
                    return this.element.text(text);
                },

                /**
                 * Callback реагирующий на изменение свойства компонента display
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} display Значение свойства компонента display
                 * @return {Button}
                 */
                displayChange:function (event, display) {
                    var me = this;
                    me.element[(me.component.isBlock() ? "add" : "remove") + 'Class']('btn-block');
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
                        me.element[(me.component['is'+oneScale]() ? "add" : "remove") + 'Class']('btn-' + oneScale.toLowerCase());
                    }

                    return me;
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this,
                        component = me.component;
                    me._super();
                    me.textChange({}, component.text());
                    me.displayChange({}, component.display());
                    me.scaleChange({}, component.scale());
                },

                destroy:function () {
                    var me = this;
                    me._super();
                }

            }
        );
    }
);