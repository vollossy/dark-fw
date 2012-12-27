steal(
    './component.js',
    function () {
        var __p_prepareSize = function(size){
                return ( size == 'auto' ) ? size : size+this.size();
            };

        /**
         * @class Dark.Models.Components.BoxComponent
         * @alias BoxComponent
         * @inherits Dark.Models.Components.Component
         * @parent Dark.Models.Components.Component
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.Component("Dark.Models.Components.BoxComponent",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "BoxComponent" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 */
                _property:{
                    size: 'px',
                    width: 'auto',
                    height: 'auto'
                }
            },
            /* @Prototype */
            {
                /**
                 * Возвращает значение ширину елемента в текущей еденице измерений
                 * @return {String}
                 */
                widthToString: function(){
                    return __p_prepareSize.call(this, this.width());
                },
                /**
                 * Возвращает значение высоты елемента в текущей еденице измерений
                 * @return {String}
                 */
                heightToString: function(){
                    return __p_prepareSize.call(this, this.height());
                }
            }
            //!steal-remove-start
            /* @Setters */
            ,{
                /**
                 * Устанавливает значение ширины компонента.
                 * @param {Number} [width="auto"]
                 * @return {BoxComponent}
                 */
                width : function(width){return this;},
                /**
                 * Устанавливает значение высоты компонента.
                 * @param {Number} [height="auto"]
                 * @return {BoxComponent}
                 */
                height : function(height){return this;},
                /**
                 * Устанавливает единицу измерения размеров компонента.
                 * @param {String} [size="px"]
                 * @return {BoxComponent}
                 */
                size : function(size){return this;}
            }
            /* @Getters */
            ,{
                /**
                 * Возвращает значение ширины компонента.
                 * @return {Number}
                 */
                width : function(){return 0;},
                /**
                 * Возвращает значение высоты компонента.
                 * @return {Number}
                 */
                height : function(){return 0;},
                /**
                 * Возвращает единицу измерения размеров компонента.
                 * @return {String}
                 */
                size : function(){return "";}
            }
            //!steal-remove-end
        );
    }
);
