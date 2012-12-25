steal(
    './../box_component.js',
    function () {
        /**
         * @class Dark.Models.Components.Buttons.Button
         * @inherits Dark.Models.Components.BoxComponent
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Models.Components.BoxComponent("Dark.Models.Components.Buttons.Button",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "Button" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
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
