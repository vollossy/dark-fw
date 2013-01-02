steal(
    './action_item.js',
    function () {
        /**
         * @class Dark.Models.Items.LinkItem
         * @alias LinkItem
         * @inherits Dark.Models.Items.ActionItem
         * @parent Dark.Models.Items.ActionItem
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Items.ActionItem("Dark.Models.Items.LinkItem",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "LinkItem" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    href: '#'
                }
            },
            /* @Prototype */
            {
                getHtmlElement: function(){
                    var me = this;
                    return '<a href="' + me.href() + '" target="_self">' + me._getInnerHtml() + '</a>'
                },

                runNoController: function(event){
                    var action = this.action();
                    if( action ){
                        event.preventDefault();
                        action.execute();
                    }
                    return event;
                }

            }
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Проверяет является ли данный класс LinkItem
                 * Метод создается динамически по alias
                 * @return {Boolean}
                 */
                isLinkItem: function(){ return true; },
                /**
                 * Проверяет является ли данный класс LinkComponent
                 * Метод создается динамически по alias
                 * @return {Boolean}
                 */
                isLinkComponent: function(){ return true; }
            }
            /* @Setters */
            , {}
            //!steal-remove-end
        );
    }
);
