steal(
    './field.js'
    ,'../../infos/field_infos/check_box_field_info.js'
    ,function () {
        /**
         * @class Dark.Models.Components.Fields.CheckBoxField
         * @alias CheckBoxField
         * @inherits Dark.Models.Components.Fields.Field
         * @parent Dark.Models.Components.Fields.Field
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Fields.Field("Dark.Models.Components.Fields.CheckBoxField",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "CheckBoxField" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    fieldInfoType: 'CheckBoxFieldInfo'
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
