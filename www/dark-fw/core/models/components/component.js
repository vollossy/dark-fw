steal(
    '../model.js',
    '../utils/handler.js',
    function () {
        var __uid = 0;
        /**
         * @class Dark.Model.Components.Component
         */
        Dark.Model("Dark.Model.Components.Component",
            {
                /**
                 * Псевдонимы текущей модели.
                 * @protected
                 */
                _alias:[ 'Component' ],

                /**
                 * Данное свойство содержит значения свойств класса - переданные ему в setup.
                 * @protected
                 */
                _property: {
                    visible:{
                        defValue: 'T'
                    },
                    css:{
                        converter: 'bindOC',
                        defValue: 'bindOC'
                    },
                    styles:{
                        converter: 'bindOC',
                        defValue: 'bindOC'
                    },
                    handlers: {
                        converter : 'componentsC',
                        defValue: 'C'
                    }
                }
            },
            {
                init:function () {
                    var me = this,
                        handlers, eventName;
                    me._super();
                    handlers = me.handlers();

                    handlers.map(function(key, handler){
                        if( handler.isModelHandler() ){
                            eventName = handler.eventName();
                            if( !!me[eventName] ){
                                me[eventName](function(){return handler.run(this)});
                            }
                        }
                    });
                },

                /**
                 * Делает компонент видимым
                 * @return {*}
                 */
                show: function(){
                    return this.visible(true);
                },

                /**
                 * Делает компонент невидимым
                 * @return {*}
                 */
                hide: function(){
                    return this.visible(false);
                },

                /**
                 * Переключкает режим видимости компонента
                 * @return {*}
                 */
                toggleVisible: function(){
                    var me = this;
                    return me.visible(!me.visible());
                },

                /**
                 * Конвертирует коллекцию содержащую css свойства в строку
                 * @return {String}
                 */
                cssToSting: function(){
                    return this.css().toArray().join(' ');
                },

                /**
                 * Конвертирует коллекцию содержащую style свойства в строку
                 * @return {String}
                 */
                stylesToSting: function(){
                    var styles = this.styles(),
                        a = [];
                    styles.map(function(key, val){
                        a.push(key + ':' + val);
                    });
                    return a.join('; ');
                }
            }
        );
    }
);