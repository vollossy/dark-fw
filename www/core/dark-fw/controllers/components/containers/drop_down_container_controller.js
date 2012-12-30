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

                _appendItem: function(parent, element){
                    parent.append($('<li></li>').append(element));
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                itemClick: function(element, item, event){
                    var me = this;
                    me._super(element, item, event);
                    if( me.component.useActive() ){
                        $('li', me.element).removeClass('active');
                        element.parent().addClass('active');
                    }
                }

            }
        );
    }
);