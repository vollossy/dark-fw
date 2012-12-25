/*
 * Author: Kostantin "Konstantin.R.Dark" Prokolenko
 * E-mail: Konstantin.R.Dark@gmail.com
 * Copyright (c) 2012.
 */
steal(
    './../models/model.js',
    '//jquery/controller/controller.js',
    function () {
        var darkStore = window.DarkStore,
            undefined = undefined,
            __isUndefined = $.isUndefined,
            __isPlainObject = $.isPlainObject,
            __isFunction = $.isFunction,
            __data = $.data;

        $.createController = function(model, element){
            model = $.isRawComponent(model) ? $.toComponent(model) : model;
            element = $(element);

            var name = darkStore.C[model.cType() + 'Controller'],
                instanceClass;

            //!steal-remove-start
            if (__isUndefined(name))
                throw new Error("Cannot read property 'shortName' of undefined");
            //!steal-remove-end

            instanceClass = $.String.getObject(name);

            //!steal-remove-start
            if (__isUndefined(instanceClass))
                throw new Error("Не могу найти нужного класса контроллера для данной модели.");
            //!steal-remove-end

            return instanceClass.newInstance(element, model);
        };

        var __s_addStore = function () {
                var me = this,
                    store;

                if (darkStore.C === undefined)
                    darkStore.C = {};

                darkStore.C[me.shortName] = me.fullName;

                return me;
            },
            __p_replaceRootElement = function(el, parent, options){
                var next = el.next(),
                    prev = el.prev();

                el.detach();
                el = this._replaceRootElement(el, options).addClass(el.attr('class'));

                if( prev.length ){
                    next.after(el);
                }else if( next.length ){
                    next.before(el);
                }else{
                    parent.append(el);
                }

                return el
            },
            /**
             * Привязывает модель элемента к dom-элементу
             * @param el
             * @param options
             * @private
             */
            __p_hookup = function(el, options){
                this.component = options;
                __data(el[0], 'component', options);
            },
            __p_unHookup = function () {
                var me = this;
                me.component = undefined;
                __data(me.element[0], 'component', undefined)
            },
            __p_subscribeToProperty = function () {
                var me = this,
                    subObj = me._subscribeToProperty(),
                    prop;

                if (__isPlainObject(subObj)) {
                    for (prop in subObj) {
                        if ( subObj.hasOwnProperty(prop) && __isFunction(me[subObj[prop]])) {
                            __p_bind.call(me, me.component[prop], me.proxy(subObj[prop]))
                        }
                    }
                }
            },
            __p_bind = function (property, fn) {
                this.__listUnbind.push(property.call(this.component, fn));
            },
            __p_unbind = function () {
                var me = this,
                    prop = me.__listUnbind,
                    i = 0, cnt = prop.length;

                for ( ; i != cnt; ) {
                    prop[i++].call(me.component);
                }

                me.__listUnbind = undefined;
            }
        ;
        /**
         * @class Dark.Controllers.Controller
         */
        $.Controller.extend("Dark.Controllers.Controller",
            {//Static

                setup:function (superClass, fullName, staticProps, protoProps) {
                    var me = this;
                    me._super(superClass, fullName, staticProps, protoProps);
                    __s_addStore.call(me);
                    me.css = !!me.css ? $.extend({}, superClass.css, me.css) : {};
                },

                css: {}
            },
            {//Prototype
                __listUnbind      :undefined,
                component       :undefined,
                parentElement   :undefined,

                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                /**
                 * Получает параметры для шаблона
                 * @return {Object}
                 */
                _getRenderParams: function(){
                    var me = this;
                    return {
                        component :   me.component,
                        css       :   me.getCss()
                    };
                },

                /**
                 * Рендерит шаблон и передает в него параметры
                 * @protected
                 * @see Dark.Controllers.Controller:_getRenderParams
                 */
                _renderTemplate:function () {
                    var me = this,
                        property = me._getRenderParams(),
                        path = me.Class.tmpl.component;

                    if( !!path ){
                        //me.element[0].innerHtml = me.view(path, property)
                        me.element.append(me.view('../../../../../dark-fw/views/core/components/' + path, property));
                    }
                },

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return {};
                },

                /**
                 *
                 * @param el
                 * @param options
                 * @return {jQuery|HTMLElement}
                 */
                _replaceRootElement: function(el, options){
                    return el;
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                /*
                 * @param el
                 * @param options
                 */
                setup:function (el, options) {
                    var me = this,
                        parent = el.parent();

                    me.parentElement = parent;
                    me.__listUnbind = [];

                    el = __p_replaceRootElement.call(me, el, parent, options);
                    __p_hookup.call(me, el, options);
                    me._super(el, options);
                },

                /**
                 *
                 */
                init:function () {
                    var me = this;
                    me.render();
                    __p_subscribeToProperty.call(me);
                },

                render: function(){
                    this._renderTemplate();
                },

                getCss: function(className){
                    return ( !!className ) ? this.Class.css[className] : this.Class.css;
                },

                destroy:function () {
                    var me = this;
                    __p_unbind.call(me);
                    __p_unHookup.call(me);
                    me.element.empty();
                    me._super();
                }

            });

    }
);