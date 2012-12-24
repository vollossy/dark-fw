steal(
    '../model.js',
    function () {
        /**
         * @class Dark.Models.Actions.Action
         */
        Dark.Model("Dark.Models.Actions.Action",
            {
                /**
                 * Псевдонимы текущей модели.
                 * @protected
                 */
                _alias:[ 'Action' ],

                _property:{
                    params: {
                        converter: 'bindOC',
                        defValue: 'bindOC'
                    }
                }
            },
            {

            }
        );
    }
);
