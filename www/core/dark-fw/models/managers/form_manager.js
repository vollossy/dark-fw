steal(
    './manager_abstract.js',
    '../data_providers/field_data_provider.js',
    function () {
        /**
         * @class Dark.Models.Managers.FormManager
         * @alias FormManager
         * @inherits Dark.Models.Managers.ManagerAbstract
         * @parent Dark.Models.Managers.ManagerAbstract
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Managers.ManagerAbstract("Dark.Models.Managers.FormManager",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "FormManager" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    formProvider: '{}',
                    provider: 'fProvider'
                }
            },
            /* @Prototype */
            {
                /**
                 * 1) Добавляет себя в formProvider
                 * 2) Проверяет на отсутствие у формы провайдера данных:
                 *      2.1) да - ставит форме свой fieldInfoProvider для хранения данных
                 * 3) Определяет были ли зарегистрированы поля для данной формы, но у них еще не проставленна форма.
                 *      3.1) да - проставляет себя в поле
                 * @param {Dark.Models.Components.Forms.Form} form
                 */
                setForm: function(form){
                    var me = this,
                        providerFields,
                        formName = form.name(),
                        propFieldName,
                        field;


                    this.formProvider()[form.name()] = form;                                // см. п.1

                    if( !form.provider() )                                                  // см. п.2
                        form.provider(me.provider());

                    providerFields = me.provider().getFields(formName);

                    for( propFieldName in providerFields ){                                 // см. п.3.1
                        if( providerFields.hasOwnProperty(propFieldName) ){
                            field = providerFields[propFieldName];
                            if( field.form() !== form )
                                field.form(form);
                        }
                    }
                },

                /**
                 * Удаляет форму из своего formProvider
                 * @param {Dark.Models.Components.Forms.Form} form
                 */
                unsetForm: function(form){
                    delete this.formProvider()[form.name()];
                },

                /**
                 * Удаляет все формы из своего formProvider
                 */
                unsetAllForm: function(){
                    this.formProvider({});
                },

                /**
                 *
                 * @param field
                 */
                changeField: function(field){
                    var me = this,
                        formProvider = me.formProvider(),
                        formName = field.formName();

                    field.form(!!formProvider[formName] ? formProvider[formName] : false);
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
