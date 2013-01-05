steal(
    '../model.js',
    function () {
        var cla = 'layout-align-',
            clva = 'layout-v-align-';

        /**
         * @class Dark.Models.Layouts.Layout
         * @alias Layout
         * @inherits Dark.Models.Model
         * @parent Dark.Models.Model
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Model("Dark.Models.Layouts.Layout",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "Layout" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    __container: {},
                    tag: 'div',
                    layoutClass: {
                        get: function(description){
                            return 'dark-' + this.Class.shortName.toLowerCase();
                        },
                        dependence: 'cType'
                    },
                    align: {
                        fnAfterSet: function(description, value, oldValue){
                            var me = this,
                                container = me.__container(),
                                cssCollection;

                            if( container && $.isString(value) ){
                                cssCollection = container.css();
                                cssCollection.removeElement(oldValue);
                                cssCollection.add(value);
                            }
                            return value;
                        },
                        defValue: cla + 'auto',
                        dependence: '__container'
                    }
                }
            },
            /* @Prototype */
            {

                setAlignStretch: function(){
                    return this.align(cla + 'stretch');
                },

                setAlignLeft: function(){
                    return this.align(cla + 'left');
                },

                setAlignAuto: function(){
                    return this.align(cla + 'auto');
                },

                setAlignRight: function(){
                    return this.align(cla + 'right');
                },

                setAlignCenter: function(){
                    return this.align(cla + 'center');
                },

                _createHtmlElement: function(key, item, info){
                    return '<' + this.tag() + '/>';
                },

                getHtmlElement: function(key, item, info){
                    return this._createHtmlElement(key, item, info);
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
