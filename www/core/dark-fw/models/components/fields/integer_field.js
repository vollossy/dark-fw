steal(
    './field.js',
    '../../infos/field_infos/integer_field_info.js',
    function () {
        /**
         * @class Dark.Models.Components.Fields.IntegerField
         * @alias IntegerField
         * @inherits Dark.Models.Components.Fields.Field
         * @parent Dark.Models.Components.Fields.Field
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Fields.Field("Dark.Models.Components.Fields.IntegerField",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "IntegerField" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    /**
                     * Шаг увеличения / уменьшения значения при клике по кнопкам управления.
                     * @var {Number}
                     */
                    step: 1,
                    /**
                     * Минимально возможное значение. Если false - без ограничения.
                     * @var {Number}
                     */
                    min: {
                        fnAfterSet: function(descriptor, value, oldValue){
                            if( !this._initializing ){
                                this.fieldInfo().min(value);
                            }
                            return value;
                        },
                        defValue: 'F'
                    },
                    /**
                     * Максимально возможное значение. Если false - без ограничения.
                     * @var {Number}
                     */
                    max: {
                        fnAfterSet: function(descriptor, value, oldValue){
                            if( !this._initializing ){
                                this.fieldInfo().max(value);
                            }
                            return value;
                        },
                        defValue: 'F'
                    },
                    fieldInfoType: 'IntegerFieldInfo',
                    fieldInfo: {
                        converter: 'fieldInfoConvert',
                        fnAfterSet: 'fieldInfoAfter',
                        defValue: 'fieldInfoDef',
                        dependence: ['formName', 'name', 'value', 'fieldInfoType', 'min', 'max']
                    }
                }
            },
            /* @Prototype */
            {
                _defValueFieldInfo: function(){
                    var me = this,
                        value = me._super();

                    value.min = me.min();
                    value.max = me.max();

                    return value;
                },

                _convertFieldInfo: function(descriptor, value){
                    var me = this;

                    value = me._super(descriptor, value);
                    value.min = me.min();
                    value.max = me.max();

                    return value;
                },

                incrementValue: function(){
                    var me = this;
                    me.value(me.value() + me.step());
                },

                decrementValue: function(){
                    var me = this;
                    me.value(me.value() - me.step());
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
