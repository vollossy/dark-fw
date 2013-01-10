steal(
    './date_field_info.js'
    ,function () {
        var moment = window.moment;
        /**
         * @class Dark.Models.Infos.FieldInfos.DateRangeFieldInfo
         * @alias DateRangeFieldInfo
         * @inherits Dark.Models.Infos.FieldInfos.FieldInfo
         * @parent Dark.Models.Infos.FieldInfos.FieldInfo
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Infos.FieldInfos.DateFieldInfo("Dark.Models.Infos.FieldInfos.DateRangeFieldInfo",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "DateRangeFieldInfo" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    value: {
                        fnBeforeSet: function(descriptor, value, oldValue){
                            if($.isPlainObject(value) ){
                                var me = this,
                                    startValue = value.startDate,
                                    endValue = value.endDate,
                                    minDate = me.minDate(),
                                    maxDate = me.maxDate();

                                if( !!minDate ){
                                    value.startDate = startValue.valueOf() < minDate.valueOf() ? minDate : startValue;
                                    value.endDate = endValue.valueOf() < minDate.valueOf() ? minDate : endValue;
                                }

                                if( !!maxDate ){
                                    value.startDate = startValue.valueOf() > maxDate.valueOf() ? maxDate : startValue;
                                    value.endDate = endValue.valueOf() > maxDate.valueOf() ? maxDate : endValue;
                                }
                            }

                            return value;
                        },
                        // Todo почему то не тригается событие если определить этот код у предка
                        triggerEvent: function (descriptor, value, oldValue) {
                            var me = this;
                            // Если класс не находится в режиме инициализации то тригнем событие изменения свойства
                            if (!me._initializing) {
                                $(me).triggerHandler(descriptor.eventName, value);
                                $(me.field()).triggerHandler(descriptor.eventName, value);
                            }
                            return this;
                        },
                        dependence: ['dateFormat', 'minDate', 'maxDate']
                    }
                }
            },
            /* @Prototype */
            {
                setValueForServer: function(){
                    var me = this,
                        date = me.value();
                    return !!date ? moment(date).format(me.dateFormat()) : date;
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
