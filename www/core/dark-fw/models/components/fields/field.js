steal(
    '../box_component.js',
    '../../managers/form_manager.js',
    '../../infos/field_infos/field_info.js',
    function () {
        var formManager = Dark.Models.Managers.FormManager.getInstance();
        /**
         * @class Dark.Models.Components.Fields.Field
         * @alias Field
         * @inherits Dark.Models.Components.BoxComponent
         * @parent Dark.Models.Components.BoxComponent
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.BoxComponent("Dark.Models.Components.Fields.Field",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "Field" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    name: {
                        fnAfterSet: function(descriptor, value, oldValue){
                            var me = this,
                                fieldInfo, form;

                            if( !me._initializing ){
                                fieldInfo = me.fieldInfo();
                                form = me.form();

                                ( form ? form : formManager ).provider().removeFieldInfo(fieldInfo);

                                fieldInfo.fieldName(value);
                                formManager.changeField(me);
                            }

                            return value;
                        },
                        defValue: ''
                    },
                    formName: {
                        fnAfterSet: function(descriptor, value, oldValue){
                            var me = this,
                                fieldInfo, form;

                            if( !me._initializing ){
                                fieldInfo = me.fieldInfo();
                                form = me.form();

                                ( form ? form : formManager ).provider().removeFieldInfo(fieldInfo);

                                fieldInfo.formName(value);
                                formManager.changeField(me);
                            }

                            return value;
                        },
                        defValue: ''
                    },
                    form: {
                        fnAfterSet: function(descriptor, value, oldValue){
                            var me = this,
                                fieldInfo;

                            if( !me._initializing ){
                                fieldInfo = me.fieldInfo();

                                ( oldValue ? oldValue : formManager ).provider().removeFieldInfo(fieldInfo);
                                ( value ? value : formManager ).provider().setFieldInfo(fieldInfo);
                            }

                            return value;
                        },
                        defValue: 'F'
                    },
                    value: {
                        get: function(descriptor){
                            var me = this;
                            // Если установлен провайдер - попросим значение у него, иначе берем внутри менеджера.
                            return me._initializing ? me[descriptor.field] : me.fieldInfo().getValue();
                        },
                        set: function(descriptor, value, oldValue){
                            var me = this;

                            if( me._initializing ){
                                me[descriptor.field] = value;
                            }else{
                                me.fieldInfo().setValue(value);
                            }

                            return value;
                        },
                        triggerEvent: function (descriptor, value, oldValue) {
                            return this;
                        }
                    },
                    fieldInfoType: 'FieldInfo',
                    fieldInfo: {
                        converter: 'fieldInfoConvert',
                        fnAfterSet: 'fieldInfoAfter',
                        defValue: 'fieldInfoDef',
                        dependence: ['formName', 'name', 'value', 'fieldInfoType']
                    },
                    label: '',
                    /**
                     * Текст блока описания
                     * @var {String}
                     */
                    descriptionText: '',
                    /**
                     * Позиция блока с описанием
                     * @var {String} block|inline
                     */
                    descriptionPosition:{ //Sever
                        defValue: 'block'
                    },
                    errors: '[]',
                    /**
                     * Провести ли валидацию сразу
                     * @var {Boolean}
                     */
                    autoValidate: 'F',
                    /**
                     * Видна ли ошибка
                     * @var {Boolean} true|false
                     */
                    _errorVisible:'F',
                    /**
                     * Флаг для запрета редактирования поля.
                     * @var {Boolean}
                     */
                    isDisabled: 'F',
                    /**
                     * Флаг для полей - Только для чтения.
                     * @var {Boolean}
                     */
                    isReadOnly: "F"
                }
            },
            /* @Prototype */
            {
                _defValueFieldInfo: function(){
                    var me = this;
                    return {
                        cType       : me.fieldInfoType(),
                        field       : me,
                        formName    : me.formName(),
                        fieldName   : me.name(),
                        value       : me.value()
                    };
                },

                _convertFieldInfo: function(descriptor, value){
                    var me = this;

                    value.field = me;
                    value.formName = me.formName();
                    value.fieldName = me.name();
                    // Значение внутри пришедшего fieldInfo важнее чем то что пришло вместе с полем
                    value.value = value.value || me.value();

                    return value;
                },
                /**
                 * @public
                 * Метод вызывется чтобы показать ошибки валидации
                 *
                 * @param {Array} textArray
                 */
                showError: function(textArray){
                    this.errors(textArray);
                    this._errorVisible(true);
                },

                /**
                 * @public
                 * Метод вызывется чтобы скрыть ошибки валидации
                 */
                hideError: function(){
                    this._errorVisible(false);
                }
            }
            //!steal-remove-start
            /* @Getters */
            , {

                /**
                 * Возвращает имя поля
                 * @return {String}
                 */
                name: function(){
                    return "";
                },

                /**
                 * Возвращает имя формы которой принадлежит поле
                 * @return {String}
                 */
                formName: function(){
                    return "";
                },

                /**
                 * Возвращает значение поля
                 * @return {*}
                 */
                value: function(){
                    return "";
                },

                /**
                 * Возвращает форму которой принадлежит поле
                 * @return {Dark.Models.Components.Forms.Form}
                 */
                form: function(){
                    return "";
                },

                /**
                 * @return {Dark.Models.Infos.FieldInfos.FieldInfo}
                 */
                fieldInfo: function(){
                    return Dark.Models.Infos.FieldInfos.FieldInfo;
                }
            }
            /* @Setters */
            , {}
            //!steal-remove-end
        );
    }
);
