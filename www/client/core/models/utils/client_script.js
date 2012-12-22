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
                        converter: 'C',
                        defValue: 'C'
                    },
                    /**
                     * @protected
                     * @var {String} Тело функции
                     */
                    _script: {
                        converter: function(property, value){
                            return {
                                func : new Function( this._args().toArray(), value),
                                str : value
                            };
                        },
                        defValue: "",
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
