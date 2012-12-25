steal(
    '../box_component.js',
    function () {
        /**
         * @class Dark.Models.Containers.Container
         * @inherits Dark.Models.BoxComponent
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Models.Components.BoxComponent("Dark.Models.Components.Containers.Container",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "Container" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Object}
                 */
                _property:{
                    items: {
                        converter: 'componentsBindOc',
                        defValue: 'bindOC'
                    }
                }
            },
            /* @Prototype */
            {

            }
        );
    }
);
