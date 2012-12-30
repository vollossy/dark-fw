steal(
    './button_abstract_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Buttons.DropDownSplitButtonController
         * @alias DropDownSplitButtonController
         * @inherits Dark.Controllers.Components.Buttons.ButtonAbstractController
         * @parent Dark.Controllers.Components.Buttons.ButtonAbstractController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Buttons.ButtonAbstractController("Dark.Controllers.Components.Buttons.DropDownSplitButtonController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'buttons/drop_down_split_button.ejs'
                },

                css:{
                    item: 'dark-btn',
                    dropDown: 'dark-drop-down-wrap'
                }
            },
            /* @Prototype */
            {//Prototype
                __innerClick: false,

                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                _replaceRootElement: function(el, options){
                    return el.addClass('btn-group');
                },

                rootElement: function(){
                    return this.find('> .btn');
                },

                _getButtonElement: function(){
                    return this.find('> .btn:first-child');
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render: function(){
                    var me = this;
                    me._super();
                    $.createController(this.component.dropDown(), me.find('.' + this.getCss().dropDown));
                },

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
                        component = me.component,
                        css = me.getCss(),
                        isBtn = el.is('.' + css.item),
                        isCaret = !isBtn && el.is('.btn'),
                        clOpen = 'open',
                        item = $.data(el[0], 'component'),
                        drop = me.find('.' + css.dropDown);

                    me.__innerClick = true;

                    if( el.is('.' + css.item) ){
                        me.component.run();
                    }

                    if( isCaret ){
                        drop[(drop.is('.' + clOpen) ? 'remove' : 'add') + 'Class'](clOpen);
                    }else{
                        if( item.isItem() && component.textIsCycle() ){
                            component.text(item.text());
                        }
                        drop.removeClass(clOpen);
                    }
                }
            }
        );
    }
);