steal(
    '../model.js',
    function () {
        /**
         * @class Dark.Model.Actions.Action
         */
        Dark.Model("Dark.Model.Actions.Action",
            {
                /**
                 * Псевдонимы текущей модели.
                 * @protected
                 */
                _alias:[ 'Action' ],

                _property:{
                    params: {
                        convert: 'bindOC',
                        defValue: 'bindOC'
                    }
                }
            },
            {
                execute: function(callback, arguments){}
            }
        );
    }
);
