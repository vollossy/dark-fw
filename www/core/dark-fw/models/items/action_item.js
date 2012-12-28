steal(
    './text_item.js',
    function () {
        /**
         * @class Dark.Models.Items.ActionItem
         * @alias ActionItem
         * @inherits Dark.Models.Items.TextItem
         * @parent Dark.Models.Items.TextItem
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Items.TextItem("Dark.Models.Items.ActionItem",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "ActionItem" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    action: {
                        converter: 'toComponent',
                        defValue: 'F'
                    }
                }
            },
            /* @Prototype */
            {

                runNoController: function(event){
                    var action = this.action();
                    if( action ){
                        action.execute();
                    }
                    return event;
                }

            }
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Проверяет является ли данный класс ActionItem
                 * Метод создается динамически по alias
                 * @return {Boolean}
                 */
                isActionItem: function(){ return true; }
            }
            /* @Setters */
            , {}
            //!steal-remove-end
        );
    }
);
