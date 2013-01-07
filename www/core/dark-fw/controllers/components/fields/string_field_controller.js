steal(
    '../../../models/components/fields/string_field.js',
    './field_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Fields.StringFieldController
         * @alias StringFieldController
         * @inherits Dark.Controllers.Components.Fields.FieldController
         * @parent Dark.Controllers.Components.Fields.FieldController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Fields.FieldController("Dark.Controllers.Components.Fields.StringFieldController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'fields/string_field.ejs'
                },

                css:{
                    inputWrap: "dark-input-wrap",
                    input: "dark-input"
                }
            },
            /* @Prototype */
            {//Prototype
                getInputWrapElement: function(){
                    return $('> .' + this.getCss('inputWrap'), this.getContainerElement())
                },

                getInputElement: function(){
                    return $('> .' + this.getCss('input'), this.getInputWrapElement())
                },

                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                valueChange: function(event, value){
                    this.getInputElement().val(this.component.value());
                },

                "change": function(){
                    this.component.value(this.getInputElement().val());
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