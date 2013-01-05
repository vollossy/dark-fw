steal(
    '../model.js',
    function () {
        /**
         * @class Dark.Models.Managers.ManagerAbstract
         * @alias ManagerAbstract
         * @inherits Dark.Models.Model
         * @parent Dark.Models.Model
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Model("Dark.Models.Managers.ManagerAbstract",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "ManagerAbstract" ],

                getInstance: function(){
                    var me = this,
                        inst = me._instance;
                    if( inst === undefined ){
                        inst = this._instance = this.newInstance.apply(this, arguments);
                    }
                    return inst;
                },

                newInstance: function() {
                    var me = this, inst = me._instance;
                    return !!inst ? inst : me._super.apply(me, arguments);
                }
            },
            /* @Prototype */
            {

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
