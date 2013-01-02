steal(
    '../model.js',
    function () {
        /**
         * @class Dark.Models.Managers.DragAndDropManager
         * @alias DragAndDropManager
         * @inherits Dark.Models.Model
         * @parent Dark.Models.Model
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Model("Dark.Models.Managers.DragAndDropManager",
            /* @Static */
            {
                _instance: undefined,
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "DragAndDropManager" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    current: 'F',
                    parentElement: 'F'
                },

                getInstance: function(){
                    var me = this,
                        inst = me._instance;
                    if( inst === undefined ){
                        inst = this._instance = Dark.Models.Managers.DragAndDropManager.newInstance.apply(this, arguments);
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
                getCurrentElement: function(){
                    var current = this.current();
                    return !!current ? current.element : false;
                },

                getParentComponent: function(){
                    var parent = this.parentElement();
                    return !!parent ? $.getComponentByElement(parent) : false;
                },

                getCurrentComponent: function(){
                    var current = this.current();
                    return !!current ? current.component : false;
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
