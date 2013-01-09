steal(
    './field.js',
    '../../infos/field_infos/date_field_info.js',
    function () {
        /**
         * @class Dark.Models.Components.Fields.DateField
         * @alias DateField
         * @inherits Dark.Models.Components.Fields.Field
         * @parent Dark.Models.Components.Fields.Field
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Fields.Field("Dark.Models.Components.Fields.DateField",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "DateField" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    minDate         : {
                        fnBeforeSet: 'stringToDate',
                        defValue: 'F'
                    },
                    maxDate         : {
                        fnBeforeSet: 'stringToDate',
                        defValue: 'F'
                    },
                    dateFormat      : 'dd.mm.yy',
                    defaultDate     : 'F',
                    changeMonth     : 'F',
                    changeYear      : 'F',
                    numberOfMonths  : 1,
                    /**
                     * @property {string} showCalendarOn Указывает на то, по клику на что должно открываться окно с календарем:
                     * 'both' - клик по текстовому полю или кнопке с календарем
                     * 'input' - текстовое поле
                     * 'button' - кнопка с календарем сразу после текстового поля.
                     */
                    showCalendarOn: 'input',
                    inlineCalendar: 'F',
                    fieldInfoType: 'DateFieldInfo',
                    fieldInfo: {
                        dependence: ['formName', 'name', 'value', 'fieldInfoType', 'minDate', 'maxDate']
                    }
                }
            },
            /* @Prototype */
            {
                _defValueFieldInfo: function(){
                    var me = this,
                        value = me._super();

                    value.minDate = me.minDate();
                    value.maxDate = me.maxDate();

                    return value;
                },

                _convertFieldInfo: function(descriptor, value){
                    var me = this;

                    value = me._super(descriptor, value);
                    value.minDate = me.minDate();
                    value.maxDate = me.maxDate();

                    return value;
                },

                _getDatePickerProperty: function(){
                    var me = this,
                        minDate = me.minDate(),
                        maxDate = me.maxDate(),
                        datepickerProperty = {
                            defaultDate     : me.value(),
                            dateFormat      : me.dateFormat(),
                            numberOfMonths  : me.numberOfMonths(),
                            changeMonth     : me.changeMonth(),
                            changeYear      : me.changeYear()
                        };

                    if( minDate ) datepickerProperty.minDate = minDate;
                    if( maxDate ) datepickerProperty.maxDate = maxDate;

                    return datepickerProperty;
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
