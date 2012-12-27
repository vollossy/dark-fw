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
                 * @param {jQueryHTMLElement} el Елемент на который был навешан данный контроллер
                 * @param {Dark.Models.Components.Buttons.Button} options Модель кнопки
                 * @return {jQuery|HTMLElement}
                 * @description
                 * Изменяем елемент контроллера на DOM елемент button
                 *
                 * Данный компонент использует вариант:
                 *
                 * @codestart
                 *  <button class="dark-btn btn">Text</button>
                 * @codeend
                 *
                 * Выдержка из Twitter Bootstrap по этому поводу:
                 *
                 * @link http://twitter.github.com/bootstrap/base-css.html#buttons
                 *
                 * Use the .btn class on an <a>, <button>, or <input> element.
                 * @codestart
                 * <a class="btn" href="">Link</a>
                 * <button class="btn" type="submit">Button</button>
                 * <input class="btn" type="button" value="Input">
                 * <input class="btn" type="submit" value="Submit">
                 * @codeend
                 *
                 * As a best practice, try to match the element for your context to ensure matching cross-browser rendering.
                 * If you have an input, use an <input type="submit"> for your button.
                 */
                _replaceRootElement: function(el, options){
                    return $('<button class="' + this.getCss('btn') + ' btn"></button>');
                },

                /**
                 *
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

                /**
                 * Callback реагирующий на изменение свойства компонента disabled
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} scale Значение свойства компонента disabled
                 * @return {Button}
                 */
                disabledChange:function (event, disabled) {
                    return this.element[(disabled ? 'add' : 'remove') + 'Class']('disabled ');
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                "click": function(){
                    this.component.run();
                }

            }
        );
    }
);