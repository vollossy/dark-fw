steal(
    './date_field.js'
    ,'../../infos/field_infos/date_range_field_info.js'
    ,function () {
        /**
         * @class Dark.Models.Components.Fields.DateRangeField
         * @alias DateRangeField
         * @inherits Dark.Models.Components.Fields.DateField
         * @parent Dark.Models.Components.Fields.DateField
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Fields.DateField("Dark.Models.Components.Fields.DateRangeField",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "DateRangeField" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    /**
                     * Начальная дата диапазона
                     * @var {Date}
                     */
                    startDate: 'F',
                    /**
                     * Конечная дата диапазона
                     * @var {Date}
                     */
                    endDate: 'F',
                    _startDateField:{
                        fnBeforeSet: 'toComponent',
                        defValue: function(){
                            return {
                                cType: 'DateField',
                                name: 'Start'+this.name()
                            }
                        },
                        dependence: ['name']
                    },
                    _endDateField:{
                        fnBeforeSet: 'toComponent',
                        defValue: function(){
                            return {
                                cType: 'DateField',
                                name: 'End'+this.name()
                            }
                        },
                        dependence: ['name']
                    },
                    fromText: '',
                    toText: '-',
                    fieldInfoType: 'DateRangeFieldInfo',
                    fieldInfo: {
                        dependence: ['formName', 'name', 'value', 'fieldInfoType', 'minDate', 'maxDate', 'startDate', 'endDate']
                    }
                }
            },
            /* @Prototype */
            {
                _defValueFieldInfo: function(){
                    var me = this,
                        value = me._super();

                    value.startDate = me.startDate();
                    value.endDate = me.endDate();

                    return value;
                },

                _convertFieldInfo: function(descriptor, value){
                    var me = this;

                    value = me._super(descriptor, value);
                    value.startDate = me.startDate();
                    value.endDate = me.endDate();

                    return value;
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
