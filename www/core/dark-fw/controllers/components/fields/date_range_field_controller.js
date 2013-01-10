steal(
    '../../../models/components/fields/date_range_field.js'
    ,'./field_controller.js'
    ,function () {
        var moment = window.moment;
        /**
         * @class Dark.Controllers.Components.Fields.DateRangeFieldController
         * @alias DateRangeFieldController
         * @inherits Dark.Controllers.Components.Fields.FieldController
         * @parent Dark.Controllers.Components.Fields.FieldController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Fields.FieldController("Dark.Controllers.Components.Fields.DateRangeFieldController",
            /* @Static */
            {//Static
                tmpl:{
                    component:  'fields/date_range_field.ejs',
                    dateField:  'fields/date_field.ejs'
                },

                css:{
                    startDate: 'dark-date-range-start-wrap',
                    endDate: 'dark-date-range-end-wrap',
                    inputWrap: "dark-input-wrap",
                    input: "dark-input"
                }
            },
            /* @Prototype */
            {//Prototype

                _getFieldWrapper: function(isStart){
                    var me = this,
                        css = me.getCss();
                    return $('> .' + (isStart ? css.startDate : css.endDate), me.getContainerElement());
                },

                _getInput: function(isStart){
                    var me = this,
                        css = me.getCss();
                    return $(' > .' + css.inputWrap + ' > .' + css.input, this._getFieldWrapper(isStart));
                },

                getStartInput: function(){
                    return this._getInput(true);
                },

                getEndInput: function(){
                    return this._getInput(false);
                },

                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                _dateChange:function (selectedDate, isStart) {
                    var me = this,
                        component = me.component,
                        startInput = me.getStartInput(),
                        endInput = me.getEndInput(),
                        startDate = startInput.datepicker('getDate'),
                        endDate = endInput.datepicker('getDate');

                    if( isStart ){
                        if(!endDate){
                            endDate = moment(startDate).clone().add('days', 1).toDate();
                            endInput.datepicker('setDate', endDate);
                        }
                    }else{
                        if(!startDate){
                            startDate = moment(endDate).clone().subtract('days', 1).toDate();
                            startInput.datepicker('setDate', startDate);
                        }
                    }

                    component.startDate(startDate);
                    component.endDate(endDate);

                    component.value({
                        startDate   : startDate,
                        endDate     : endDate
                    });
                },

                _initDatepicker: function(input, property, cbName){
                    var me = this,
                        component = me.component,
                        showCalendarOn = component.showCalendarOn();

                    property.onSelect = me.proxy(cbName);

                    input.datepicker(property);

                    if(showCalendarOn == 'button'){
                        input.off('focus');
                    }
                    if(showCalendarOn != 'input'){
                        $('button', me.element).click(function(e){
                            input.datepicker('show');
                        });
                    }
                },

                _destroyDatepickers: function(){
                    var me = this,
                        destr = 'destroy';
                    me.getStartInput().datepicker(destr);
                    me.getEndInput().datepicker(destr);
                },

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {

                    });
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                startChange:function (selectedDate) {
                    this._dateChange(selectedDate, true);
                },

                endChange:function (selectedDate) {
                    this._dateChange(selectedDate, false);
                },

                valueChange: function(event, value){
                    var me = this,
                        startInput = me.getStartInput(),
                        endInput = me.getEndInput(),
                        startDate = value.startDate;

                    startInput.datepicker("setDate", startDate);
                    endInput.datepicker('option', 'minDate', startDate);
                    endInput.datepicker("setDate", value.endDate);
                },

                _renderOneField: function(isStart){
                    var me = this,
                        component = me.component,
                        startDateField = component._startDateField(),
                        endDateField = component._endDateField(),
                        dateField = isStart ? startDateField : endDateField,
                        property = {
                            component :   dateField,
                            css       :   me.getCss()
                        },
                        path = this.Class.tmpl.dateField;

                    me._getFieldWrapper(isStart).append(me._getRenderView(path, property));
                    me._initDatepicker(
                        me['get' + (isStart ? 'Start' : 'End') + 'Input'](),
                        dateField._getDatePickerProperty(),
                        ((isStart ? 'start' : 'end') + 'Change')
                    );
                },

                render:function () {
                    var me = this;
                    me._super();

                    me._renderOneField(true);
                    me._renderOneField(false);
                },

                /**
                 * @function refresh
                 * @description
                 * Очищает this.element и вызывает повторно вызывает отрисовку контроллера. ( this.render() )
                 */
                refresh: function(){
                    var me = this;
                    me._destroyDatepickers();
                    me._super();
                },

                destroy:function () {
                    var me = this;
                    me._destroyDatepickers();
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