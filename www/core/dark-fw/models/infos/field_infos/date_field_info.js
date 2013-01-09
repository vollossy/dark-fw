steal(
    './field_info.js'
    ,'jquery/moment/moment.min.js'
    ,function () {
        var moment = window.moment;
        /**
         * @class Dark.Models.Infos.FieldInfos.DateFieldInfo
         * @alias DateFieldInfo
         * @inherits Dark.Models.Infos.FieldInfos.FieldInfo
         * @parent Dark.Models.Infos.FieldInfos.FieldInfo
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Infos.FieldInfos.FieldInfo("Dark.Models.Infos.FieldInfos.DateFieldInfo",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "DateFieldInfo" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    dateFormat: {
                        get: true,
                        set: true,
                        defaultValue: 'YYYY-MM-DD HH:mm:ss'
                    },
                    minDate : {
                        fnBeforeSet: 'stringToDate',
                        dependency: ['dateFormat']
                    },
                    maxDate : {
                        fnBeforeSet: 'stringToDate',
                        dependency: ['dateFormat']
                    },
                    value: {
                        fnBeforeSet: function(descriptor, value, oldValue){
                            var me = this,
                                momentValue = moment(value, me.dateFormat()),
                                minDate = me.minDate(),
                                maxDate = me.maxDate();

                            if($.isString(value) && !!value){
                                value = momentValue.toDate()
                            }

                            if( !!minDate && value.valueOf() < minDate.valueOf() ){
                                value = minDate;
                            }

                            if( !!maxDate && value.valueOf() > maxDate.valueOf() ){
                                value = maxDate;
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
