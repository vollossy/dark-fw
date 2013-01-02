steal(
    './button_abstract_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Buttons.ButtonController
         * @alias ButtonController
         * @inherits Dark.Controllers.Components.Buttons.ButtonAbstractController
         * @parent Dark.Controllers.Components.Buttons.ButtonAbstractController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Buttons.ButtonAbstractController("Dark.Controllers.Components.Buttons.ButtonController",
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
                    var tag = options.tag();
                    return $('<' + tag + ' class="' + this.getCss('btn') + ' btn" ' + (tag === 'a' ? 'href=""' : "") + '/>');
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