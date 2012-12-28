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
                    return $('<a href="' + options.href() + '">' + options.text() + '</a>');
                },

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        href    : "hrefChange"
                    });
                },

                /**
                 * Callback реагирующий на изменение свойства компонента href
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} href Значение свойства компонента href
                 * @return {Button}
                 */
                textChange:function (event, href) {
                    return this.element.attr('href', href);
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