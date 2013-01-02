steal(
    '../model.js',
    '../utils/handler.js',
    function () {
        /**
         * @class Dark.Models.Components.Component
         * @alias Component
         * @inherits Dark.Models.Model
         * @parent Dark.Models.Model
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Model("Dark.Models.Components.Component",
            /* @Static */
            {
                /**
                 * Псевдонимы текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ 'Component' ],

                /**
                 * Данное свойство содержит значения свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property: {
                    visible: 'T',
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
                    },
                    useDragHandler: 'F'
                }
            },
            /* @Prototype */
            {
                setup:function (attributes) {
                    var me = this,
                        handlers, eventName;
                    me._super(attributes);

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

                isItem: function(){
                    return false;
                },

                isComponent: function(){
                    return true;
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

                /**
                 * @function id
                 * @param {Number|undefined}
                 * @return {Dark.Models.Components.Component|Number}
                 * @description
                 * Идентификатор компонента. По умолчанию: генерируется автоматически
                 */
                /**
                 * @function visible
                 * @param {Boolean|undefined}
                 * @return {Dark.Models.Model|Boolean}
                 * @description
                 * Значение высоты контейнера компонента. По умолчанию: "auto".
                 */

            }
        );
    }
);