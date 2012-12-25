steal(
    './component.js',
    function () {
        /**
         * @class Dark.Models.Components.BoxComponent
         * @inherits Dark.Models.Components.Component
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Models.Components.Component("Dark.Models.Components.BoxComponent",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "BoxComponent" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Object}
                 */
                _property:{
                    size: {
                        defValue: 'px'
                    },
                    width:{
                        defValue: 'auto'
                    },
                    height:{
                        defValue: 'auto'
                    }
                }
            },
            /* @Prototype */
            {
                prepareSize: function(size){
                    return ( size == 'auto' ) ? size : size+this.size();
                },

                getWidth: function(){
                    return this.prepareSize(this.width());
                },

                getHeight: function(){
                    return this.prepareSize(this.height());
                }
            }
        );
    }
);
