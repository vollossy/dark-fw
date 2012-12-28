steal(
    './action_item.js',
    function () {
        /**
         * @class Dark.Models.Items.CheckedItem
         * @alias CheckedItem
         * @inherits Dark.Models.Items.ActionItem
         * @parent Dark.Models.Items.ActionItem
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Items.ActionItem("Dark.Models.Items.CheckedItem",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "CheckedItem" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    checked: 'F',
                    unCheckAction: {
                        converter: 'toComponent',
                        defValue: false
                    }

                }
            },
            /* @Prototype */
            {
                runNoController: function(event){
                    var me = this,
                        action = me.action(),
                        checked = me.checked(),
                        unCheckAction = me.unCheckAction();

                    me.checked(!checked);

                    if( checked && unCheckAction )
                        unCheckAction.execute();

                    if( !checked && action )
                        action.execute();

                    return event;
                }

            }
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Проверяет является ли данный класс CheckedItem
                 * Метод создается динамически по alias
                 * @return {Boolean}
                 */
                isCheckedItem: function(){ return true; }
            }
            /* @Setters */
            , {}
            //!steal-remove-end
        );
    }
);
