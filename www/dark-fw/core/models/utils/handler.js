steal(
    '../model.js',
    function ($) {
        var undefined = undefined;

        /**
         * @description Класс обработчик событий. Может быть переданн с сервера к любому компоненту.
         *              Когда срабатывает любое событие - вызывается обработчик подписаный на имя этого события.
         *
         * @class Dark.Models.Utils.Handler
         * @inherits Dark.Model
         *
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Models.Model("Dark.Models.Utils.Handler",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "Handler" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Object}
                 */
                _property:{
                    /**
                     * @description Флаг указатель что событие обработки - серверное.
                     * То есть подписываться нужно на события модели.
                     * @protected
                     * @add Dark.Models.Utils.Handler.Prototype
                     * @var {Boolean}
                     *
                     * @function _isModel
                     * @param {Boolean}
                     * @return {Boolean}
                     */
                    _isModel:{
                        defValue: false
                    },
                    /**
                     * @description Имя события по которому срабатывает данный обработчик
                     * @public
                     * @add Dark.Models.Utils.Handler.Prototype
                     * @var {Object}
                     *
                     * @function eventName
                     * @param {String}
                     * @return {String}
                     */
                    eventName: {},
                    /**
                     * @description Произвольный скрипт который нужно выполнить при срабатывании обработчика.
                     *              Обработка скрипта имеет меньший приоритет.
                     *              Поэтому если с сервера приходит и действие и скрипт - срабатывает действие
                     * @add Dark.Models.Utils.Handler.Prototype
                     *
                     * @var {String|Object|Dark.Models.Utils.ClientScript}
                     *
                     * @function script
                     * @var {Dark.Models.Utils.ClientScript}
                     * @params {String|Object|Dark.Models.Utils.ClientScript}
                     * @return {Dark.Models.Utils.ClientScript}
                     */
                    script:{
                        converter: 'toClientScript',
                        defValue: 'F'
                    },
                    /**
                     * @description Действие которое нужно выполнить при срабатывании обработчика.
                     *              Обработка действия имеет больший приоритет.
                     *              Поэтому если с сервера приходит и действие и скрипт - срабатывает действие
                     * @add Dark.Models.Utils.Handler.Prototype
                     *
                     * @var {Object|Dark.Models.Actions.Action}
                     *
                     * @function action
                     * @params {Object|Dark.Models.Actions.Action}
                     * @return {Dark.Models.Actions.Action}
                     */
                    action:{
                        converter: 'toComponent',
                        defValue: 'F'
                    }
                }
            },
            /* @Prototype */
            {
                isModelHandler: function(){
                    return this._isModel();
                },

                run: function(context, callback){
                    var me = this,
                        script = me.script(),
                        action = me.action();

                    return action
                        ? action.execute(callback)
                        : script
                        ? script.getFn().apply(context)
                        : undefined;
                }
            }
        );
    }
);
