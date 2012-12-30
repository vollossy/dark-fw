steal(
    './button_abstract_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Buttons.DropDownButtonController
         * @alias DropDownButtonController
         * @inherits Dark.Controllers.Components.Buttons.ButtonAbstractController
         * @parent Dark.Controllers.Components.Buttons.ButtonAbstractController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Buttons.ButtonAbstractController("Dark.Controllers.Components.Buttons.DropDownButtonController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'buttons/drop_down_button.ejs'
                },

                css:{
                    item: 'dark-btn',
                    dropDown: 'dark-drop-down-wrap'
                }
            },
            /* @Prototype */
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                _replaceRootElement: function(el, options){
                    return el.addClass('btn-group');
                },

                rootElement: function(){
                    return this.find('> .btn');
                },

                /**
                 * Callback реагирующий на изменение свойства компонента display
                 * @param {jQueryEvent} event jQuery Событие
                 * @param {String} text Значение свойства компонента text
                 * @return {Button}
                 */
                textChange:function (event, text) {
                    return this.find('> .btn:first-child').html(text + ' <span class="caret"></span>');
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render: function(){
                    var me = this;
                    me._super();
                    $.createController(this.component.dropDown(), me.find('.' + this.getCss().dropDown));
                },

                __innerClick: false,

                "{window} click": function(element, event){
                    var me = this;

                    if( !me.__innerClick ){
                        me.find('.open').removeClass('open');
                    }
                    me.__innerClick = false;
                },

                "click": function(element, event){
                    var me = this,
                        el = $(event.target),
                        css = me.getCss(),
                        isBtn = el.is('.' + css.item),
                        clOpen = 'open',
                        drop = me.find('.' + css.dropDown);

                    me.__innerClick = true;

                    if( isBtn ){
                        drop[(drop.is('.' + clOpen) ? 'remove' : 'add') + 'Class'](clOpen);
                    }else{
                        drop.removeClass(clOpen);
                    }
                }
            }
        );
    }
);