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
