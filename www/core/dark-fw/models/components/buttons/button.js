steal(
    '../box_component.js',
    function () {
        /**
         * @class Dark.Models.Components.Buttons.Button
         * @alias Button
         * @inherits Dark.Models.Components.BoxComponent
         * @parent Dark.Models.Components.BoxComponent
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.BoxComponent("Dark.Models.Components.Buttons.Button",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "Button" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Object}
                 */
                _property:{
                    text: {
                        defValue: ""
                    }
                }
            },
            /* @Prototype */
            {

            }
        );
    }
);
