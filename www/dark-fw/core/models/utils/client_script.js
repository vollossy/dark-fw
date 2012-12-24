steal(
    '../model.js',
    function () {
        /**
         * @class Dark.Models.Utils.ClientScript
         */
        Dark.Model("Dark.Models.Utils.ClientScript",
            {
                _alias: [ "ClientScript" ],

                _property:{
                    /**
                     * @protected
                     * @var {Array} Массив имен аргументов для создаваемой функции
                     */
                    _args:{
                        defValue: '[]'
                    },
                    /**
                     * @protected
                     * @var {String} Тело функции
                     */
                    _script: {
                        converter: function(property, value){
                            return {
                                func : new Function( this._args(), value),
                                str : value
                            };
                        },
                        defValue: false,
                        dependence: '_args'
                    }
                }
            },
            {
                getFn: function(){
                    var script = this._script();
                    return !!script ? script.func : $.noop;
                }
            }
        );
    }
);
