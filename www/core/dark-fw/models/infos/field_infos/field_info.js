steal(
    '../../model.js',
    function () {
        /**
         * @class Dark.Models.Infos.FieldInfos.FieldInfo
         * @alias FieldInfo
         * @inherits Dark.Models.Model
         * @parent Dark.Models.Model
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Model("Dark.Models.Infos.FieldInfos.FieldInfo",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "FieldInfo" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    fieldName: '',
                    formName: '',
                    value: {},
                    field: {}
                }
            },
            /* @Prototype */
            {

                getValue: function(){
                    return this.value();
                },

                setValue: function(value){
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
