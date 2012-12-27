steal(
    '../box_component.js',
    '../../layouts/flow_layout.js',
    '../../layouts/h_layout.js',
    '../../layouts/v_layout.js',
    '../../infos/layout_info.js',
    function () {
        var isArray = $.isArray;
        /**
         * @class Dark.Models.Components.Containers.Container
         * @alias Container
         * @inherits Dark.Models.Components.BoxComponent
         * @parent Dark.Models.Components.BoxComponent
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Components.BoxComponent("Dark.Models.Components.Containers.Container",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "Container" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @protected
                 */
                _property:{
                    items: {
                        converter: function(description, value){
                            var me = this,
                                collection, i = 0, cnt,
                                item, isDoubleList, isOneInArray;

                            for( cnt = value.length; i != cnt; i++ ){
                                item = value[i];
                                isDoubleList = isArray(item);
                                isOneInArray = isDoubleList && item.length == 1;

                                //!steal-remove-start
                                if( isDoubleList && isOneInArray ){
                                    throw new Error('container.static.items.converter: ' +
                                        'Передавая в массиве один елемент - чего вы пытались добиться? :) ' +
                                        'Не проще ли было передать просто один елемент или [ елемент + info ]');
                                }
                                //!steal-remove-end
                                value[i] = isDoubleList ? $.toManyComponent(item) : $.toComponent(item);
                            }

                            collection = Dark.Models.Utils.Collection.newInstance({ _elements: value });

                            collection.activateObserversMode().bindWithAllEvent(function(ev, el){
                                $(me).triggerHandler(description.eventName, el)
                            });

                            return collection;
                        },
                        defValue: 'bindOC'
                    },
                    layout:{
                        converter: function(property, value){
                            return $.toComponent(value).__container(this);
                        },
                        defValue: function(){
                            return Dark.Models.Layouts.FlowLayout.newInstance({ __container: this });
                        }
                    }
                }
            },
            /* @Prototype */
            {
                init: function(){
                    var me = this,
                        layout = me.layout();
                    me._super();

                    if(!!layout){
                        me.css().add(layout.layoutClass());
                    }
                    if($.isFunction(layout.align) ){
                        me.css().add(layout.align());
                    }
                },
                /**
                 * Создает dom елемент для одного компонента из коллекции items
                 * @return {jQueryHtmlElement}
                 * @public
                 */
                getDomElement: function(key, item){
                    return this.layout().getDomElement(key, item);
                }

            }
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Возвращает Dark.Models.Layouts.Layout
                 * @return {Layout}
                 */
                layout: function(){ return Dark.Models.Layouts.Layout; }
            }
            /* @Setters */
            , {
                /**
                 * Устанавливает Dark.Models.Layouts.Layout
                 * @param {Layout} [collection=Dark.Models.Layouts.Layout}
                 * @return {LayoutContainer}
                 */
                layout: function(collection){ return Dark.Models.Layouts.Layout; }
            }
            //!steal-remove-end
        );
    }
);
