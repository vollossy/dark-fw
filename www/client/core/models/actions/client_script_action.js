steal(
    'action.js',
    '../utils/client_script.js',
    function () {
        var __ClientScript = Dark.Models.Utils.ClientScript;
        /**
         * @class Dark.Model.Actions.ClientScriptAction
         */
        Dark.Model.Actions.Action("Dark.Model.Actions.ClientScriptAction",
            {
                /**
                 * Псевдонимы текущей модели.
                 * @protected
                 */
                _alias:[ 'ClientScriptAction' ],

                _property:{
                    /**
                     * Скрипт переданный из вне. Данное свойство принимет одно из трех значений:
                     *  - строка с телом функции
                     *  - данные для модели компонента Dark.Models.Utils.ClientScript
                     *  - экземпляр компонента Dark.Models.Utils.ClientScript
                     *
                     *  @public
                     *  @var {Dark.Models.Utils.ClientScript}
                     *  @params {String|Object|Dark.Models.Utils.ClientScript}
                     */
                    script: {
                        converter: function(property, value){
                            return $.isString(value)
                                ? __ClientScript.newInstance({ _script : value })
                                : $.isRawComponent(value)
                                    ? $.toComponent(value)
                                    : value;
                        },
                        defValue: 'F'
                    }
                }
            },
            {
                /**
                 * Вызывает функцию this.script из переданной строки. Результат выполнения передает в callback.
                 * Возвращает результат callback - если он есть иначе результат функции this.script
                 * @params {Function|*} callback
                 * @return {*}
                 */
                execute: function(callback){
                    var me = this,
                        jsCb = me.script(),
                        request;

                    if( jsCb ){
                        request = jsCb.getFn().apply(me, [].slice.call(arguments, 1));

                        if( !!callback )
                            request = cb.call(me, request);
                    }

                    return request;
                }
            }
        );
    }
);
