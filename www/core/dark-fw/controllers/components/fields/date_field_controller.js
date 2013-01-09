steal(
    '../../../models/components/fields/date_field.js'
    ,'./field_controller.js'
    ,'jquery/ui/jquery.ui.datepicker.js'
    ,function () {
        /**
         * @class Dark.Controllers.Components.Fields.DateFieldController
         * @alias DateFieldController
         * @inherits Dark.Controllers.Components.Fields.FieldController
         * @parent Dark.Controllers.Components.Fields.FieldController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Fields.FieldController("Dark.Controllers.Components.Fields.DateFieldController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'fields/date_field.ejs'
                },

                css: {
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
                _getDatePickerProperty: function(){
                    var me = this,
                        datepickerProperty = me.component._getDatePickerProperty();

                    datepickerProperty.onSelect = me.proxy('onSelectDate');

                    return datepickerProperty;
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this,
                        component = me.component,
                        showCalendarOn = component.showCalendarOn(),
                        input;
                    me._super();
                    input = me.getInputElement();

                    input.datepicker(me._getDatePickerProperty());

                    if(showCalendarOn == 'button'){
                        input.off('focus');
                    }
                    if(showCalendarOn != 'input'){
                        $('button', me.element).click(function(e){
                            input.datepicker('show');
                        });
                    }

                },

                /**
                 * @function refresh
                 * @description
                 * Очищает this.element и вызывает повторно вызывает отрисовку контроллера. ( this.render() )
                 */
                refresh: function(){
                    var me = this;
                    me.getInputElement().datepicker("destroy");
                    me._super();
                },

                onSelectDate: function(){
                    this.component.value(this.getInputElement().datepicker("getDate"));
                },

                valueChange: function(event, value){
                    this.getInputElement().datepicker("setDate", this.component.value());
                },

                "change": function(){
                    this.onSelectDate();
                },

                destroy:function () {
                    var me = this;
                    me.getInputElement().datepicker("destroy");
                    me._super();
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