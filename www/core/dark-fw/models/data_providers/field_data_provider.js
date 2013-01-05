steal(
    '../model.js',
    function () {
        /**
         * @class Dark.Models.DataProviders.FieldDataProvider
         * @alias FieldDataProvider
         * @inherits Dark.Models.Model
         * @parent Dark.Models.Model
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Model("Dark.Models.DataProviders.FieldDataProvider",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "FieldDataProvider" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    collection: '{}'
                }
            },
            /* @Prototype */
            {
                /**
                 * Возвращает ключ по которому хранится fieldInfo
                 * @param {Dark.Models.Components.Fields.Field|Dark.Models.Infos.FieldInfos.FieldInfo} model
                 * @return {String}
                 */
                getKey: function(model){
                    var fieldName = $.isFunction(model.fieldName) ? model.fieldName() : model.name(),
                        formName  = model.formName();
                    return (formName ? formName + '_' : "") + fieldName;
                },

                /**
                 * Добавляет FieldInfo в свою коллекцию
                 * @param {Dark.Models.Infos.FieldInfos.FieldInfo} info
                 * @return {Dark.Models.Infos.FieldInfos.FieldInfo}
                 */
                setFieldInfo: function(info){
                    var me = this, key = me.getKey(info);
                    me.collection()[key] = info;
                    return info;
                },

                /**
                 * Возвращает FieldInfo из своей коллекции которое принадлежит переданному полю
                 * @param {Dark.Models.Components.Fields.Field} field Поле для которого ищем fieldInfo
                 * @return {Dark.Models.Infos.FieldInfos.FieldInfo}
                 */
                getFieldInfo: function(field){
                    return this.collection()[this.getKey(field)];
                },

                /**
                 * Удаляет FieldInfo из своей коллекции
                 * @param {Dark.Models.Infos.FieldInfos.FieldInfo} info Удаляемое FieldInfo
                 * @return {Dark.Models.Infos.FieldInfos.FieldInfo} Удаленное FieldInfo
                 */
                removeFieldInfo: function(info){
                    var me = this;
                    delete me.collection()[me.getKey(info)];
                    return info;
                },

                /**
                 * Возвращает значение переданного поля
                 * @param {Dark.Models.Components.Fields.Field} field Поле у которого нужно попросить значение
                 * @return {*}
                 */
                getValue: function(field){
                    var me = this;
                    return me.getFieldInfo(field).getValue();
                },

                /**
                 * Возвращает значение переданного поля для передачи на сервер
                 * @param {Dark.Models.Components.Fields.Field} field Поле у которого нужно попросить значение
                 * @return {*}
                 */
                getValueForServer: function(field){
                    var me = this;
                    return me.getFieldInfo(field).getValueForServer();
                },

                /**
                 * Устанавливает value в поле
                 * @param {Dark.Models.Components.Fields.Field} field Поле у которого нужно установить значение
                 * @param {*} value Устанавливаемое значение
                 * @return {*}
                 */
                setValue: function(field, value){
                    var me = this;
                    return me.getFieldInfo(field).setValue(value);
                },

                /**
                 * Перебирает коллекцию fieldInfo и для каждого найденного вызывает callback
                 * @param {Function} cb Функция обратного вызова
                 * @private
                 */
                __map: function(formName, cb){
                    var me = this,
                        infoKey,
                        collection = me.collection(),
                        info;
                    for( infoKey in collection ){
                        if( collection.hasOwnProperty(infoKey) ){
                            info = collection[infoKey];
                            if( info.formName() == formName ){
                                cb(infoKey, info, info.field());
                            }
                        }
                    }
                },

                /**
                 * Возвращает массив значении полей
                 * @param {String} formName Имя формы для которой возвращаются значений полей
                 * @return {Object}
                 */
                getValues: function(formName){
                    var me = this,
                        result = {};

                    me.__map(formName, function(key, info, field){
                        result[field.name()] = me.getValue(field);
                    });

                    return result;
                },

                /**
                 * Возвращает массив значении полей для передачи на сервер
                 * @param {String} formName Имя формы для которой возвращаются значений полей
                 * @return {Object}
                 */
                getValuesForServer: function(formName){
                    var me = this,
                        result = {};

                    me.__map(formName, function(key, info, field){
                        result[field.name()] = me.getValueForServer(field);
                    });

                    return result;
                },

                /**
                 * Возвращает модели всех полей принадлежащих данной форме.
                 * @param {String} formName Имя формы для которой возвращаются поля
                 * @return {Object}
                 */
                getFields: function(formName){
                    var me = this,
                        result = {};

                    me.__map(formName, function(key, info, field){
                        result[field.name()] = field;
                    });

                    return result;
                }

            }
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Объект с хранимыми внутри FieldInfo
                 * @return {Object}
                 */
                collection: function(){
                    return {};
                }
            }
            /* @Setters */
            , {

            }
            //!steal-remove-end
        );
    }
);
