/*
 * Author: Kostantin "Konstantin.R.Dark" Prokolenko
 * E-mail: Konstantin.R.Dark@gmail.com
 * Copyright (c) 2012.
 */
steal(
    'jquery/view/ejs/ejs.js'
    ,'jquery/controller/view/view.js'
    ,'jquery/controller/controller.js'
    ,'../models/model.js'
    ,function () {
        var darkStore = window.DarkStore,
            undefined = undefined,
            __isUndefined = $.isUndefined,
            __isPlainObject = $.isPlainObject,
            __isFunction = $.isFunction;

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
        $.getComponent = function(selector){
            return $(selector).data('component');
        };

        $.getComponentById = function(id){
            return $('#' + id).data('component');
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
                    prev = el.prev(),
                    old = el,
                    attrs, nodeName, nodeValue;

                el.detach();
                attrs = el[0].attributes;
                el = this._replaceRootElement(el, options);
                if( el !== old){
                    for( var i = 0, cnt = attrs.length; i != cnt; i++ ){
                        nodeName = attrs[i].nodeName;
                        nodeValue = attrs[i].nodeValue;

                        if( nodeName === 'class' ){
                            el.addClass(nodeValue);
                        }else if( nodeName === 'id' ){
                            continue;
                        }else{
                            el.attr(nodeName, nodeValue);
                        }
                    }
                }

                if( old !== el ){
                    old.remove();
                }
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
             * @description Привязывает модель элемента к dom-элементу
             * @param {HTMLElement}el
             * @param {Dark.Models.Model} options
             */
            __p_hookup = function(el, options){
                this.component = options;
                $.data(el[0], 'component', options);
            },
            __p_unHookup = function () {
                var me = this;
                me.component = undefined;
                $.data(me.element[0], 'component', undefined)
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
         * @parent index
         * @inherits jQuery.Controller
         * @description
         * Базовый класс для всех контроллеров
         */
        $.Controller.extend("Dark.Controllers.Controller",
            /* @Static */
            {
                /**
                 * @function setup Cтатическая инициализация данного класса
                 * @param {Object} baseClass Базовый класс, от которого наследуются
                 * @param {String} fullName Полное имя текущего класса
                 * @param {Object} staticProps Статические свойства и методы текущего класса
                 * @param {Object} protoProps Прототипные свойства и методы текущего класса
                 * @description
                 * Метод вызывается в момент когда произошла загрузка данного скрипта.
                 */
                setup:function (baseClass, fullName, staticProps, protoProps) {
                    var me = this;
                    me._super(baseClass, fullName, staticProps, protoProps);
                    __s_addStore.call(me);
                    me.css = !!me.css ? $.extend({}, baseClass.css, me.css) : {};
                }
            },
            /* @Prototype */
            {
                __listUnbind    : undefined,
                component       : undefined,
                parentElement   : undefined,

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
                 * Получает параметры для шаблона
                 * @return {Object}
                 */
                _getRenderHelpers: function(){
                    return {};
                },

                /**
                 * Рендерит шаблон и передает в него параметры
                 * @protected
                 * @see Dark.Controllers.Controller:_getRenderParams
                 */
                _renderTemplate:function () {
                    var me = this,
                        property = me._getRenderParams(),
                        helpers = me._getRenderHelpers(),
                        path = me.Class.tmpl.component,
                        tmpl;

                    if( !!path ){

                        tmpl = me.view('../../dark-fw/views/core/components/' + path, property, helpers);

                        //!steal-remove-start
                        if (__isUndefined(tmpl))
                            throw new Error("Упал рендеринг шаблона!");
                        //!steal-remove-end

                        //me.element[0].innerHtml = tmpl
                        me.element.append(tmpl);
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
                    me._super(el, options);
                    __p_hookup.call(me, el, options);
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