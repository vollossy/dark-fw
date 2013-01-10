steal(
    './field_info.js'
    ,function () {
        /**
         * @class Dark.Models.Infos.FieldInfos.CheckBoxFieldInfo
         * @alias CheckBoxFieldInfo
         * @inherits Dark.Models.Infos.FieldInfos.FieldInfo
         * @parent Dark.Models.Infos.FieldInfos.FieldInfo
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Infos.FieldInfos.FieldInfo("Dark.Models.Infos.FieldInfos.CheckBoxFieldInfo",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "CheckBoxFieldInfo" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    value: {
                        fnBeforeSet: function(description, value, oldValue){
                            if( $.isNumeric(value) )
                                value = !!(value >= 1);

                            if( $.isString(value) )
                                value = value.toLowerCase() !== 'false';

                            if( value === true || value === false ){
                                value = {
                                    checked: value,
                                    data: !!oldValue && !!oldValue.data ? oldValue.data : false,
                                    text: !!oldValue && !!oldValue.text ? oldValue.text : ""
                                }
                            }
                            return value;
                        },
                        triggerEvent: function (descriptor, value, oldValue) {
                            var me = this;
                            // Если класс не находится в режиме инициализации то тригнем событие изменения свойства
                            if (!me._initializing) {
                                $(me).triggerHandler(descriptor.eventName, value);
                                $(me.field()).triggerHandler(descriptor.eventName, value);
                            }
                            return this;
                        }
                    }
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
