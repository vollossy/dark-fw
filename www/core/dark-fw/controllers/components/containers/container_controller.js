steal(
    '../../../models/components/containers/container.js',
    '../box_component_controller',
    function () {
        var __p_bindToEventCollection = function(){
                var me = this,
                    collection = this.component.items();
                collection.bindWithAddEvent(me.proxy('addItemCb'));
                collection.bindWithSetEvent(me.proxy('setItemCb'));
                collection.bindWithRemoveEvent(me.proxy('removeItemCb'));
            },
            __p_unbindToEventCollection = function(){
                var me = this,
                    collection = me.component.items();
                collection.unbindWithAddEvent(me.proxy('addItemCb'));
                collection.unbindWithSetEvent(me.proxy('setItemCb'));
                collection.unbindWithRemoveEvent(me.proxy('removeItemCb'));
            };

        /**
         * @class Dark.Controllers.Components.Containers.Container
         * @inherits Dark.Controllers.Components.BoxComponent
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Controllers.Components.BoxComponentController("Dark.Controllers.Components.Containers.ContainerController",
            {//Static
                tmpl:{
                    component: 'containers/container.ejs'
                },

                css:{
                    itemWrap: 'dark-container-wrap',
                    item: 'dark-container-item'
                }
            },
            {//Prototype
                _getItemElement: function(){
                    return $('<div class="' + this.getCss().item + '"></div>');
                },

                _getItemWrapElement: function(){
                    return this.find('> .' + this.getCss('itemWrap'));
                },
                /**
                 * Получает параметры для шаблона
                 * @return {Object}
                 */
                _getRenderHelpers: function(){
                    var me = this,
                        items = me.component.items(),
                        css = me.getCss();
                    return {
                        toManyControllers: function(){
                            var result = [];
                            items.map(function(){
                                result.push(me._getItemElement());
                            });
                            return function(el) {
                                var parent = $(el),
                                    itemElement;
                                items.map(function(key, item){
                                    itemElement = result[key];
                                    parent.append($.createController(item, itemElement).element);
                                });
                            };
                        }
                    };
                },

                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/

                addItemCb: function(event, item){
                    var me = this,
                        items = me.component.items(),
                        tag = me._getItemElement();

                    me._getItemWrapElement()[items.isStackMode() ? 'prepend' : 'append']($.createController(item, tag).element);
                },

                setItemCb: function(event, element){
                    debugger
                },

                removeItemCb: function(event, element){
                    debugger
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this;
                    me._super();
                    __p_bindToEventCollection.call(me);
                },

                destroy:function () {
                    var me = this;
                    __p_unbindToEventCollection.call(me);
                    me._super();
                }

            }
        );
    }
);