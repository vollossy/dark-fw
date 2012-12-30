steal(
    '../../../models/items/link_item.js',
    '../../controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Links.LinkComponentController
         * @alias LinkComponentController
         * @inherits Dark.Controllers.Controller
         * @parent Dark.Controllers.Controller
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Controller("Dark.Controllers.Components.Links.LinkComponentController",
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
                 * Изменяем елемент контроллера на DOM елемент a
                 * @param {jQueryHTMLElement} el Елемент на который был навешан данный контроллер
                 * @param {Dark.Models.Components.Buttons.Button} options Модель ссылки
                 * @return {jQuery|HTMLElement}
                 */
                _replaceRootElement: function(el, options){
                    return $(options.getHtmlElement());
                },

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        href    : "hrefChange",
                        text    : "textChange",
                        icon    : "iconChange",
                        iconPosition: "iconPositionChange"
                    });
                },

                /**
                 * Callback реагирующий на изменение свойства компонента href
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} href Значение свойства компонента href
                 * @return {Button}
                 */
                hrefChange:function (event, href) {
                    return this.element.attr('href', href);
                },

                /**
                 * Callback реагирующий на изменение свойства компонента text
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} text Значение свойства компонента text
                 * @return {Button}
                 */
                textChange:function (event, text) {
                    return this.element.html(this.component._getInnerHtml());
                },
                /**
                 * Callback реагирующий на изменение свойства компонента icon
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} icon Значение свойства компонента icon
                 * @return {Button}
                 */
                iconChange:function (event, icon) {
                    return this.element.html(this.component._getInnerHtml());
                },
                /**
                 * Callback реагирующий на изменение свойства компонента iconPosition
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} iconPosition Значение свойства компонента iconPosition
                 * @return {Button}
                 */
                iconPositionChange:function (event, iconPosition) {
                    return this.element.html(this.component._getInnerHtml());
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                'click': function(element, event){
                    var action = this.component.action();
                    if( action ){
                        event.preventDefault();
                        action.execute();
                    }
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