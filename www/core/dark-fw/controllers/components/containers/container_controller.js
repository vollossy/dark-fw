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
                collection.bindWithChangeModeEvent(me.proxy('refresh'));
            },
            __p_unbindToEventCollection = function(){
                var me = this,
                    collection = me.component.items();
                collection.unbindWithAddEvent(me.proxy('addItemCb'));
                collection.unbindWithSetEvent(me.proxy('setItemCb'));
                collection.unbindWithRemoveEvent(me.proxy('removeItemCb'));
                collection.unbindWithChangeModeEvent(me.proxy('refresh'));
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
                _getNewItemElement: function(key){
                    return $('<div class="' + this.getCss().item + '" dark-attr-key="' + key + '"></div>');
                },

                _getItemWrapElement: function(){
                    return this.find('> .' + this.getCss('itemWrap'));
                },

                _getItemElements: function(){
                    return $('> .' + this.getCss().item, this._getItemWrapElement());
                },

                _getItemElementByKey: function(key){
                    return $('> .' + this.getCss().item + '[dark-attr-key="' + key + '"]' , this._getItemWrapElement());
                },

                /**
                 * Получает параметры для шаблона
                 * @return {Object}
                 */
                _getRenderHelpers: function(){
                    var me = this,
                        items = me.component.items();
                    return {
                        toManyControllers: function(){
                            var result = [];
                            items.map(function(key, item){
                                result.push(me._getNewItemElement(key));
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
                        tag = me._getNewItemElement();

                    me._getItemWrapElement(items.count() - 1)[items.isStackMode() ? 'prepend' : 'append']($.createController(item, tag).element);
                },

                setItemCb: function(event, item){
                    var me = this,
                        items = me.component.items(),
                        key = items.getKey(item),
                        element = me._getItemElementByKey(key);

                    if( element ){
                        element.replaceWith($.createController(item, me._getNewItemElement(key)).element)
                    }else{
                        me.addItemCb(false, element);
                    }
                },

                removeItemCb: function(event, item){
                    var element = $('#' + item.id());

                    if( element ){
                        element.remove();
                    }
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