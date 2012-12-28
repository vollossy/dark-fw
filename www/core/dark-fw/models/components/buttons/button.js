steal(
    '../box_component.js',
    function () {
        /**
         * @class Dark.Models.Components.Buttons.Button
         * @alias Button
         * @inherits Dark.Models.Components.BoxComponent
         * @parent Dark.Models.Components.BoxComponent
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.BoxComponent("Dark.Models.Components.Buttons.Button",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "Button", "DropDownButton" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Object}
                 */
                _property:{
                    text: "",
                    display: 'inline',
                    scale: 'default',
                    disabled: false,
                    action: {
                        converter: 'toComponent',
                        defValue: 'F'
                    },
                    dropDown:{
                        converter: 'toComponent',
                        defValue: 'F'
                    }
                }
            },
            /* @Prototype */
            {
                run: function(){
                    var me = this,
                        action = me.action();
                    if( !me.disabled() && action ){
                        action.execute();
                    }
                },
                /***************************************************
                 *  Scale
                 **************************************************/

                /**
                 * Устанавливает mini масштаб кнопки
                 * @return {Button}
                 */
                setScaleMini: function(){
                    return this.scale('mini');
                },
                /**
                 * Устанавливает mini масштаб кнопки
                 * @return {Button}
                 */
                setScaleSmall: function(){
                    return this.scale('small');
                },
                /**
                 * Устанавливает default масштаб кнопки
                 * @return {Button}
                 */
                setScaleDefault: function(){
                    return this.scale('default');
                },
                /**
                 * Устанавливает large масштаб кнопки
                 * @return {Button}
                 */
                setScaleLarge: function(){
                    return this.scale('large');
                },
                /**
                 * Проверяет устанавлен ли mini масштаб кнопки
                 * @return {Button}
                 */
                isMini: function(){
                    return this.scale() == 'mini';
                },
                /**
                 * Проверяет устанавлен ли small масштаб кнопки
                 * @return {Button}
                 */
                isSmall: function(){
                    return this.scale() == 'small';
                },
                /**
                 * Проверяет устанавлен ли default масштаб кнопки
                 * @return {Button}
                 */
                isDefault: function(){
                    return this.scale() == 'default';
                },
                /**
                 * Проверяет устанавлен ли large масштаб кнопки
                 * @return {Button}
                 */
                isLarge: function(){
                    return this.scale() == 'large';
                },

                /***************************************************
                 *  Display
                 **************************************************/

                /**
                 * Устанавливает inline-режим отображения кнопки
                 * @return {Button}
                 */
                setDisplayInline: function(){
                    return this.display('inline');
                },
                /**
                 * Устанавливает block-режим отображения кнопки
                 * @return {Button}
                 */
                setDisplayBlock: function(){
                    return this.display('block');
                },

                /**
                 * Определяет находится ли кнопка в inline-режиме
                 * @return {Boolean}
                 */
                isInline: function(){
                    return this.display() == 'inline';
                },

                /**
                 * Определяет находится ли кнопка в block-режиме
                 * @return {Boolean}
                 */
                isBlock: function(){
                    return this.display() == 'block';
                }
            }
        );
    }
);
