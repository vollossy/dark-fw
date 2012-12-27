steal(
    '../../../models/components/containers/container.js',
    '../box_component_controller',
    function () {
        var __p_bindToEventCollection = function(){
                var me = this,
                    collection = this.component.items();
                collection.bindWithAddEvent(me.proxy('_addItemCb'));
                collection.bindWithSetEvent(me.proxy('_setItemCb'));
                collection.bindWithRemoveEvent(me.proxy('_removeItemCb'));
                collection.bindWithChangeModeEvent(me.proxy('refresh'));
            },
            __p_unbindToEventCollection = function(){
                var me = this,
                    collection = me.component.items();
                collection.unbindWithAddEvent(me.proxy('_addItemCb'));
                collection.unbindWithSetEvent(me.proxy('_setItemCb'));
                collection.unbindWithRemoveEvent(me.proxy('_removeItemCb'));
                collection.unbindWithChangeModeEvent(me.proxy('refresh'));
            };

        /**
         * @class Dark.Controllers.Components.Containers.ContainerController
         * @alias ContainerController
         * @inherits Dark.Controllers.Components.BoxComponentController
         * @parent Dark.Controllers.Components.BoxComponentController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.BoxComponentController("Dark.Controllers.Components.Containers.ContainerController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'containers/container.ejs'
                },

                css:{
                    itemWrap: 'dark-container-wrap',
                    item: 'dark-container-item'
                }
            },
            /* @Prototype */
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/

                /**
                 * Создает dom елемент для одного компонента из коллекции items
                 * @param {Number|String} key Ключ компонента в коллекции
                 * @return {jQueryHtmlElement}
                 * @protected
                 */
                _getNewItemElement: function(key, item){
                    var el = this.component.getDomElement(key, item);
                    console.log(el);
                    if( el ){
                        el.addClass(this.getCss().item);
                    }
                    //return $('<div class="' + this.getCss().item + '" dark-attr-key="' + key + '"></div>');
                    return el;
                },
                /**
                 * Возвращает DOM-елемент контейнер в котором содержатся DOM-елементы компонентов из коллекции items
                 * @return {jQueryHtmlElement}
                 * @protected
                 */
                _getItemWrapElement: function(){
                    return this.find('> .' + this.getCss('itemWrap'));
                },
                /**
                 * Находит все DOM-елементы для компонентов из коллекции items
                 * @return {Array}
                 * @protected
                 */
                _getItemElements: function(){
                    return $('> .' + this.getCss().item, this._getItemWrapElement());
                },
                /**
                 * Находит DOM-елемент по ключ компонента из коллекции который содержится в атрибуте "dark-attr-key"
                 * @param {Number|String} key Ключ компонента в коллекции
                 * @return {jQueryHtmlElement}
                 * @protected
                 */
                _getItemElementByKey: function(key){
                    return $('> .' + this.getCss().item + '[dark-attr-key="' + key + '"]' , this._getItemWrapElement());
                },

                /**
                 * Получает Helper::toManyControllers для шаблона
                 * @return {Object}
                 * @protected
                 */
                _getRenderHelpers: function(){
                    var me = this,
                        items = me.component.items();
                    return {
                        toManyControllers: function(){
                            var result = [];
                            items.map(function(key, item){
                                result.push(me._getNewItemElement(key, item));
                            });
                            return function(el) {
                                var parent = $(el),
                                    itemElement;
                                items.map(function(key, item){
                                    itemElement = result[key];
                                    parent.append($.createController($.isArray(item) ? item[0] : item, itemElement).element);
                                });
                            };
                        }
                    };
                },
                /**
                 * Callback на событие добавления елемента в коллекцию
                 * @param {jQueryEvent} event Произошедшее событие
                 * @param {Component} item Компонент который добавили
                 * @protected
                 */
                _addItemCb: function(event, item){
                    var me = this,
                        items = me.component.items(),
                        tag = me._getNewItemElement(items.count() - 1, item);

                    me._getItemWrapElement(items.count() - 1)[items.isStackMode() ? 'prepend' : 'append']($.createController(item, tag).element);
                },
                /**
                 * Callback на событие изменения елемента коллекции на другой, если такой был
                 * или если ключ по которому устанавливали отсутсвовал - значит добавили новый
                 * @function ContainerController._setItemCb
                 * @param {jQueryEvent} event Произошедшее событие
                 * @param {Component} item Компонент который измененили
                 * @protected
                 */
                _setItemCb: function(event, item){
                    var me = this,
                        items = me.component.items(),
                        key = items.getKey(item),
                        element = me._getItemElementByKey(key);

                    if( element ){
                        element.replaceWith($.createController(item, me._getNewItemElement(key, item)).element)
                    }else{
                        me._addItemCb(false, element);
                    }
                },
                /**
                 * Callback на событие удаление елемента из коллекции
                 * @param {jQueryEvent} event Произошедшее событие
                 * @param {Component} item Компонент который удалили
                 * @protected
                 */
                _removeItemCb: function(event, item){
                    var element = $('#' + item.id());

                    if( element ){
                        element.remove();
                    }
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                /**
                 * Отрисовка контроллера.
                 * Вызываем метод подписки на события коллекции items
                 */
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