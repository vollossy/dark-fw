steal(
    '../../../models/components/fields/string_field.js',
    './simple_field_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Fields.StringFieldController
         * @alias StringFieldController
         * @inherits Dark.Controllers.Components.Fields.SimpleFieldController
         * @parent Dark.Controllers.Components.Fields.SimpleFieldController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Fields.SimpleFieldController("Dark.Controllers.Components.Fields.StringFieldController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'fields/string_field.ejs'
                }
            },
            /* @Prototype */
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
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