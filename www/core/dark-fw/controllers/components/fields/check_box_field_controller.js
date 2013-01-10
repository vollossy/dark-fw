steal(
    '../../../models/components/fields/check_box_field.js'
    ,'./simple_field_controller.js'
    ,function () {
        var checked = "checked";
        /**
         * @class Dark.Controllers.Components.Fields.CheckBoxFieldController
         * @alias CheckBoxFieldController
         * @inherits Dark.Controllers.Components.Fields.SimpleFieldController
         * @parent Dark.Controllers.Components.Fields.SimpleFieldController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Fields.SimpleFieldController(
            "Dark.Controllers.Components.Fields.CheckBoxFieldController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'fields/check_box_field.ejs'
                },

                css:{
                    inputWrap: "dark-input-wrap",
                    input: "dark-input"
                }
            },
            /* @Prototype */
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                _changed: false,

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {
                        asToggle        : {name: 'refresh', auto: false},
                        text            : {name: 'refresh', auto: false},
                        buttonState     : {name: 'refresh', auto: false}
                    });
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/

                valueChange: function(event, value){
                    var me = this,
                        input = me.getInputElement();
                    if( value[checked] ){
                        input.attr(checked, checked).addClass('active');
                    }else{
                        input.removeAttr(checked).removeClass('active')
                    }
                },

                "change": function(element, event){
                    var me = this;
                    me._changed = true;
                    me.component.value(!!me.getInputElement().attr(checked));
                },

                "click": function(){
                    var me = this,
                        component = me.component;
                    if( !me._changed )
                        component.value(!component.value()[checked]);
                    else
                        me._changed = false;
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