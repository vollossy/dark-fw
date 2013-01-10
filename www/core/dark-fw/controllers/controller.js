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
    ,'../models/managers/drag_and_drop_manager.js'
    ,'jquery/ui/jquery.ui.draggable.js'
    ,function () {
        var darkStore = window.DarkStore,
            ddManager = Dark.Models.Managers.DragAndDropManager.getInstance(),
            undefined = undefined,
            __isUndefined = $.isUndefined,
            __isPlainObject = $.isPlainObject,
            __isString = $.isString,
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

        $.getComponentByElement = function(element){
            return $(element).data('component');
        };

        var __s_addStore = function () {
                var me = this,
                    store;

                if (darkStore.C === undefined)
                    darkStore.C = {};

                darkStore.C[me.shortName] = me.fullName;

                return me;
            },
            /**
             * @param {jQuery} el jQuery Dom елемент
             * @param {jQuery} parent jQuery Dom parent елемент
             * @param {Dark.Models.Model} options Экземпляр модели
             * @return {jQuery}
             */
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

                if( prev.length ){
                    prev.after(el);
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
                    prop, nameFn;
                subObj = __isPlainObject(subObj) ? subObj : {};

                for (prop in subObj) {
                    if ( subObj.hasOwnProperty(prop) ) {
                        nameFn = subObj[prop];
                        subObj[prop] = nameFn = __isString(nameFn) ? { name : nameFn, auto: true } : nameFn;

                        if ( __isFunction(me[nameFn.name])) {
                            __p_bind.call(me, me.component[prop], me.proxy(nameFn.name))
                        }else{
                            delete subObj[prop];
                        }
                    }
                }
                me.__listEvents = subObj;
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
         * Базовый класс для всех контроллеров
         * @class Dark.Controllers.Controller
         * @alias Controller
         * @inherits jQuery.Controller
         * @parent index
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
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
                    me.tmpl = !!me.tmpl ? $.extend({}, baseClass.tmpl, me.tmpl) : {};
                }
            },
            /* @Prototype */
            {
                __listEvents    : undefined,
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
                 * Получает Helpers для шаблона
                 * @return {Object}
                 */
                _getRenderHelpers: function(){
                    return {};
                },

                /**
                 * Возвращает элемент внутрь которого необходимо отрисовать основной шаблон компонента
                 * @private
                 */
                _getRenderElement: function(){
                    return this.element;
                },

                /**
                 * Добавляет полученный шаблон в элемент отрисовки
                 * @private
                 */
                _renderElement: function(tmpl){
                    this._getRenderElement().html(tmpl);
                },

                _getRenderView: function(path, property, helpers){
                    return this.view('../../dark-fw/views/core/components/' + path, property, helpers);
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

                        tmpl = me._getRenderView(path, property, helpers);

                        //!steal-remove-start
                        if (__isUndefined(tmpl))
                            throw new Error("Упал рендеринг шаблона!");
                        //!steal-remove-end

                        //me.element[0].innerHtml = tmpl
                        me._renderElement(tmpl);
                    }
                },

                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return {
                        id      : "idChange"
                    };
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

                _changeEvents: function(){
                    var me = this,
                        subObj = me.__listEvents,
                        prop;

                    for (prop in subObj) {
                        if ( subObj.hasOwnProperty(prop) && subObj[prop].auto ) {
                            me[subObj[prop].name](false, me.component[prop]());
                        }
                    }
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                /*
                 * @function setup
                 * @param {jQuery} el jQuery Dom елемент
                 * @param {Dark.Models.Model} model Экземпляр модели для которой вызывается контроллер
                 * @description
                 * Метод создания экземпляра контроллера
                 */
                setup:function (el, model) {
                    var me = this,
                        parent = el.parent();

                    me.parentElement = parent;
                    me.__listUnbind = [];

                    el = __p_replaceRootElement.call(me, el, parent, model);
                    me._super(el, model);
                    __p_hookup.call(me, el, model);
                },

                /**
                 * Инициализация экземпляра контроллера. Вызываются методы render и _subscribeToProperty
                 */
                init:function () {
                    var me = this,
                        element = me.element,
                        component = me.component,
                        css = me.getCss(),
                        wrap = css && css.wrap ? " " + css.wrap : "",
                        mCssClass = 'dark-' + component.cType().toLowerCase();

                    $.data(element[0], 'sysCssClass', element.attr('class') + ' ' + mCssClass + wrap);

                    element.addClass(mCssClass);
                    me.render();

                    if( component.useDragHandler() ){
                        element.draggable({
                            zIndex: 1000,
                            start: me.proxy('_dragStart'),
                            stop: me.proxy('_dragStop'),
                            helper: "clone"
                        });
                    }
                },

                _dragStart: function(event, ui){
                    ddManager.current(this);
                    ddManager.parentElement(this.element.parent().parent());
                },

                _dragStop: function(){
                    ddManager.current(false);
                    ddManager.parentElement(false);
                },

                idChange: function (event, element) {
                    var me = this;
                    me.element.attr('id', me.component.id());
                },

                getSysCssClass: function(){
                    return $.data(this.element[0], 'sysCssClass');
                },

                /**
                 * Отрисовка контроллера. Вызываем рендеринг шаблона ( _renderTemplate )
                 */
                render: function(){
                    this._renderTemplate();
                    __p_subscribeToProperty.call(this);
                    this._changeEvents();

                },

                /**
                 * @function refresh
                 * @description
                 * Очищает this.element и вызывает повторно вызывает отрисовку контроллера. ( this.render() )
                 */
                refresh: function(){
                    var me = this;
                    me.element.empty();
                    me.render();
                    me._changeEvents();
                },

                /**
                 * @function getCss
                 * @param {String} className Имя свойства в котором содержится строка с имененм класса
                 * @return {Object|String}
                 * @description
                 * Возвращает все css классы объявленные в контроллере в статическом свойстве css.
                 * Если className === undefined вернется весь объект иниче только значение свйоства css[className]
                 */
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