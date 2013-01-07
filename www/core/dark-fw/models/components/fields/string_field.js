steal(
    './field.js',
    function () {
        /**
         * @class Dark.Models.Components.Fields.StringField
         * @alias StringField
         * @inherits Dark.Models.Components.Fields.Field
         * @parent Dark.Models.Components.Fields.Field
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Fields.Field("Dark.Models.Components.Fields.StringField",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "StringField" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    fieldInfoType: 'FieldInfo'
                }
            },
            /* @Prototype */
            {

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
