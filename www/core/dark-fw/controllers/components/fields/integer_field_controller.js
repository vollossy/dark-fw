steal(
    '../../../models/components/fields/integer_field.js',
    './simple_field_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Fields.IntegerFieldController
         * @alias IntegerFieldController
         * @inherits Dark.Controllers.Components.Fields.SimpleFieldController
         * @parent Dark.Controllers.Components.Fields.SimpleFieldController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Fields.SimpleFieldController("Dark.Controllers.Components.Fields.IntegerFieldController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'fields/integer_field.ejs'
                },

                css:{
                    leftBtn: "dark-left-btn",
                    rightBtn: "dark-right-btn"
                },

                defaults: {
                    eventClasses: {
                        minusBtn: "dark-left-btn",
                        plusBtn: "dark-right-btn"
                    }
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
                '.{eventClasses.minusBtn} click': function(){
                    this.component.decrementValue();
                },

                '.{eventClasses.plusBtn} click': function(){
                    this.component.incrementValue();
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