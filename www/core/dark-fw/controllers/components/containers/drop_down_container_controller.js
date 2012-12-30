steal(
    './container_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Containers.DropDownContainerController
         * @alias DropDownContainerController
         * @inherits Dark.Controllers.Components.Containers.ContainerController
         * @parent Dark.Controllers.Components.Containers.ContainerController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Containers.ContainerController("Dark.Controllers.Components.Containers.DropDownContainerController",
            /* @Static */
            {//Static
                tmpl:{
                    component: 'containers/drop_down_container_container.ejs'
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
                 * Находит все DOM-елементы для компонентов из коллекции items
                 * @return {Array}
                 * @protected
                 */
                _getItemElements: function(){
                    return $('> li > .' + this.getCss().item, this._getItemWrapElement());
                },
                /**
                 * Находит DOM-елемент по ключ компонента из коллекции который содержится в атрибуте "dark-attr-key"
                 * @param {Number|String} key Ключ компонента в коллекции
                 * @return {jQueryHtmlElement}
                 * @protected
                 */
                _getItemElementByKey: function(key){
                    return $('> li > .' + this.getCss().item + '[dark-attr-key="' + key + '"]' , this._getItemWrapElement());
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
                            return function(element) {
                                var parent = $(element),
                                    itemElement,
                                    isArr, component, compIsItem, compIsComponent;

                                items.map(function(key, item){
                                    itemElement = result[key];

                                    isArr = $.isArray(item);
                                    component = isArr ? item[0] : item;

                                    compIsItem = component.isItem();
                                    compIsComponent = component.isComponent();

                                    if( compIsComponent || (compIsItem && !component.onlyModel())){
                                        itemElement = $.createController(component, itemElement).element;
                                    }else{
                                        itemElement.attr('dark-container-parent-id', me.component.id());
                                        $.data(itemElement[0], 'component', component);
                                    }

                                    parent.append($('<li></li>').append(itemElement));
                                });
                            };
                        }
                    };
                }

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/

            }
        );
    }
);