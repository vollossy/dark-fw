steal(
    './field_info.js',
    function () {
        /**
         * @class Dark.Models.Infos.FieldInfos.IntegerFieldInfo
         * @alias IntegerFieldInfo
         * @inherits Dark.Models.Infos.FieldInfos.FieldInfo
         * @parent Dark.Models.Infos.FieldInfos.FieldInfo
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Infos.FieldInfos.FieldInfo("Dark.Models.Infos.FieldInfos.IntegerFieldInfo",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "IntegerFieldInfo" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    min: {
                        fnAfterSet: function(description, min, olValue){
                            var me = this;
                            if( !me._initializing ){
                                me.setValue(me.value());
                            }
                            return min;
                        },
                        defValue: 'F'
                    },
                    max: {
                        fnAfterSet: function(description, max, olValue){
                            var me = this;
                            if( !me._initializing ){
                                me.setValue(me.value());
                            }
                            return max;
                        },
                        defValue: 'F'
                    }
                }
            },
            /* @Prototype */
            {
                getValue: function(){
                    return parseInt(this.value(), 10);
                },

                setValue: function(value){
                    var me = this,
                        min = me.min(),
                        max = me.max();

                    if( min !== false ){
                        value = value > min ? value : min;
                    }
                    if( max !== false ){
                        value = value < max ? value : max;
                    }

                    return this.value(value);
                },

                setValueForServer: function(){
                    return this.value();
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
