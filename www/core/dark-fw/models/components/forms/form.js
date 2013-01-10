steal(
    '../containers/container.js',
    function () {
        var formManager = Dark.Models.Managers.FormManager.getInstance();
        /**
         * @class Dark.Models.Components.Forms.Form
         * @alias Form
         * @inherits Dark.Models.Components.Containers.Container
         * @parent Dark.Models.Components.Containers.Container
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Containers.Container("Dark.Models.Components.Forms.Form",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "Form" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    name: '',
                    provider: 'fProvider',
                    fieldLayout: "horizontal"
                }
            },
            /* @Prototype */
            {
                setup: function(attributes){
                    var me = this;
                    me._super(attributes);
                    me.setFormInFormManager();
                },

                /**
                 * Устанавливает текущую форму в FormManager
                 */
                setFormInFormManager: function(){
                    formManager.setForm(this);
                },

                /**
                 * Удаляет текущую форму из FormManager
                 */
                unsetFormInFormManager: function(){
                    formManager.unsetForm(this);
                },

                /**
                 * Возвращает массив значения полей из провайдера данных формы
                 * @return {Array}
                 */
                getValues: function(){
                    return this.provider().getValues(this.name());
                },

                /**
                 * Возвращает массив значения полей из провайдера данных формы для передачи на сервер
                 * @return {Array}
                 */
                getValuesForServer: function(){
                    return this.provider().getValuesForServer(this.name());
                },

                /**
                 * Возвращает массив ссылок на поля из провайдера данных формы
                 * @return {Array}
                 */
                getFields: function(){
                    return this.provider().getFields(this.name());
                }
            }
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Возвращает имя формы
                 * @return {String}
                 */
                name: function(){
                    return "";
                },
                /**
                 * Возвращает провайдер данных формы
                 * @return {Dark.Models.DataProviders.FieldDataProvider}
                 */
                provider: function(){
                    return Dark.Models.DataProviders.FieldDataProvider;
                }
            }
            /* @Setters */
            , {
                /**
                 * Устанавливает провайдер данных формы
                 * @param {Dark.Models.DataProviders.FieldDataProvider}
                 */
                provider: function(provider){}
            }
            //!steal-remove-end
        );
    }
);
