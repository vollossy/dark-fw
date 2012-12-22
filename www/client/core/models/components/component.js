steal(
    '../model.js',
    function () {
        var __uid = 0;
        /**
         * @class Dark.Model.Components.Component
         */
        Dark.Model("Dark.Model.Components.Component",
            {
                /**
                 * Данное свойство содержит значения свойств класса - переданные ему в setup.
                 * @protected
                 */
                _property: {
                    id:{
                        fnAfterSet: function(value){
                            return value ? value : this.Class.shortName+"_"+__uid;
                        },
                        defValue: 'F'
                    },
                    visible:{
                        defValue: 'T'
                    },
                    css:{
                        convert: 'bindOC',
                        defValue: 'bindOC'
                    },
                    styles:{
                        convert: 'bindOC',
                        defValue: 'bindOC'
                    },
                    handlers: {
                        convert : 'componentsC',
                        defValue: 'C'
                    }
                }
            },
            {
                init:function () {
                    var me = this;
                    me._super();

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