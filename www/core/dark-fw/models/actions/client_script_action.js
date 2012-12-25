steal(
    './action.js',
    '../utils/client_script.js',
    function () {
        var __p_execute = function(callback){
            var me = this,
                script = me.script(),
                request;

            if( script ){
                request = script.getFn().apply(me, [].slice.call(arguments, 1));

                if( !!callback )
                    request = callback.call(me, request);
            }

            return request;
        };
        /**
         * @class Dark.Models.Actions.ClientScriptAction
         */
        Dark.Models.Actions.Action("Dark.Models.Actions.ClientScriptAction",
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
                        converter: 'toClientScript',
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
                    return __p_execute.call(this, callback);
                }
            }
        );
    }
);
