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
                _alias:[ "Button", "DropDownButton", "DropDownSplitButton" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    text        : "",
                    display     : 'inline',
                    scale       : 'default',
                    disabled    : false,
                    textPrefix  : "",
                    textIsCycle : false,
                    icon        : "",
                    iconPosition: "left", // left || right
                    action      : {
                        converter   : 'toComponent',
                        defValue    : 'F'
                    },
                    dropDown    : {
                        converter   : 'toComponent',
                        defValue    : 'F'
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
                 *  Icon Position
                 **************************************************/
                /**
                 * Проверяет что устанавлена позиция иконки слева
                 * @return {Button}
                 */
                isIconPositionLeft: function(){
                    return this.iconPosition() === 'left';
                },

                /**
                 * Проверяет что устанавлена позиция иконки справа
                 * @return {Button}
                 */
                isIconPositionRight: function(){
                    return this.iconPosition() === 'right';
                },

                /***************************************************
                 *  Scale
                 **************************************************/
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
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Возвращает Dark.Models.Layouts.Layout
                 * @return {Boolean}
                 */
                textCycle: function(){ return true; },
                /**
                 * Возвращает позицию иконки
                 * @return {String}
                 */
                iconPosition: function(){}
            }
            /* @Setters */
            , {
                /**
                 * Устанавливает цикличность текста
                 * @param {Boolean} [textCycle=true}
                 * @return {Button}
                 */
                textCycle: function(textCycle){ return true; },
                /**
                 * Устанавливает позицию иконки
                 * @param {String} [iconPosition='left'|'right'}
                 * @return {Button}
                 */
                iconPosition: function(iconPosition){}
            }
            //!steal-remove-end

        );
    }
);
