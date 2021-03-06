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

                _getButtonElement: function(){
                    return this.element;
                },

                /**
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        text    : "textChange",
                        textPrefix      : "textPrefixChange",
                        icon            : "iconChange",
                        iconPosition    : "iconPositionChange",
                        display : "displayChange",
                        scale   : "scaleChange",
                        disabled: "disabledChange",
                        dropDown: { name: 'refresh', auto: false }
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
                 * @param {String} scale Значение свойства disabled
                 * @return {Button}
                 */
                disabledChange:function (event, disabled) {
                    return this.rootElement()[(disabled ? 'add' : 'remove') + 'Class']('disabled');
                },

                /**
                 * Callback реагирующий на изменение свойства компонента display
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} text Значение свойства компонента text
                 * @return {Button}
                 */
                textChange:function (event, text) {
                    return this._getButtonElement().html(this._getInnerButtonHtml());
                },

                /**
                 * Callback реагирующий на изменение свойства компонента textPrefix
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} textPrefix Значение свойства компонента textPrefix
                 * @return {Button}
                 */
                textPrefixChange:function (event, textPrefix) {
                    return this._getButtonElement().html(this._getInnerButtonHtml());
                },

                /**
                 * Callback реагирующий на изменение свойства компонента icon
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} icon Значение свойства icon
                 * @return {Button}
                 */
                iconChange: function(event, icon){
                    return this._getButtonElement().html(this._getInnerButtonHtml());
                },

                /**
                 * Callback реагирующий на изменение свойства компонента iconPosition
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} iconPosition Значение свойства iconPosition
                 * @return {Button}
                 */
                iconPositionChange: function(event, iconPosition){
                    return this._getButtonElement().html(this._getInnerButtonHtml());
                },

                /**
                 * Возвращает html для отображения иконки
                 * @return {String}
                 * @private
                 */
                _getIconHtml: function(){
                    var component = this.component,
                        icon = component.icon(),
                        positionLeft = component.isIconPositionLeft(),
                        html = '<i class="icon-' + icon + '"></i>';
                    return icon ? positionLeft ? html + ' ' : ' ' + html : "";
                },

                /**
                 * Возвращает html для отображения внутри кнопки. Иконка, префикс, текст
                 * @return {String}
                 * @private
                 */
                _getInnerButtonHtml: function(){
                    var me = this,
                        component = me.component,
                        prefix = component.textPrefix(),
                        text = component.text(),
                        icon = me._getIconHtml(),
                        iconPositionIsLeft = component.isIconPositionLeft();
                    return (iconPositionIsLeft ? icon : "") + prefix + text + (iconPositionIsLeft ? "" : icon);
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