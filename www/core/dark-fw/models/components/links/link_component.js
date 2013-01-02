steal(
    '../component.js',
    function () {
        /**
         * @class Dark.Models.Components.Links.LinkComponent
         * @alias LinkComponent
         * @inherits Dark.Models.Components.Component
         * @parent Dark.Models.Components.Component
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Component("Dark.Models.Components.Links.LinkComponent",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "LinkComponent" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    text: "",
                    icon: '',
                    iconPosition: 'left',
                    href: '#',
                    action: {
                        converter: 'toComponent',
                        defValue: 'F'
                    }
                }
            },
            /* @Prototype */
            {
                /***************************************************
                 *  Icon Position
                 **************************************************/
                /**
                 * Проверяет что устанавлена позиция иконки слева
                 * @return {Button}
                 */
                isIconPositionLeft: function(){
                    return this.iconPosition() === 'left';
                },

                /**
                 * Проверяет что устанавлена позиция иконки справа
                 * @return {Button}
                 */
                isIconPositionRight: function(){
                    return this.iconPosition() === 'right';
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
