steal(
    '../javascriptMVC/jquery/class/class.js',
    function () {
        var undefined = undefined,
            darkStore = window.DarkStore = {},
            __s_defGetters = {},
            __s_defSetters = {},
            __s_dependenceProperty = undefined,
            /**
             * Добавление текущего класса в спец.хранилище которое содержит
             * соответствие короткого имени класса с длинным, а так же доступные alias.
             * @context Static Class
             * @see Dark.Model.setup()
             * @private
             * @var me
             */
            __s_addStore = function () {
                var me = this,
                    fullName = me.fullName,
                    alias = !!me._alias ? me._alias : [],
                    i = 0, cnt = alias.length,
                    store;

                if (darkStore.M === undefined) darkStore.M = {};

                store = darkStore.M;
                store[me.shortName] = fullName;

                for (; i != cnt;) {
                    store[alias[i++]] = fullName;
                }

                return me;
            },
            /**
             * @context Static Class
             */
            __s_initProperty = function (property, descriptor) {
                descriptor.mark = 'none';

                // Если геттер не определен значит поставим флаг что использовать стандартный
                if (descriptor.get === undefined) descriptor.get = true;

                // Если свойство определено как функция то вызываем ее иначе
                // если не определено - значит используем стандартную
                // Вызывается перед основным сеттером
                // !Функция обязательно должна возвращать переданное в нее значение
                if (descriptor.fnBeforeSet === undefined) descriptor.fnBeforeSet = undefined;

                // Если свойство определено как функция то вызываем ее иначе
                // если не определено - значит используем стандартную
                // !Функция обязательно должна возвращать переданное в нее значение
                if (descriptor.set === undefined) descriptor.set = undefined;

                // Если свойство определено как функция то вызываем ее иначе
                // если не определено - значит используем стандартную
                // Вызывается после основного сеттера
                // !Функция обязательно должна возвращать переданное в нее значение
                if (descriptor.fnAfterSet === undefined) descriptor.fnAfterSet = undefined;

                // Физически значение хранится в в свойстве '__' + property,
                // само же свойство превращается в геттер / сеттер
                if (descriptor.field === undefined) descriptor.field = '__' + property;

                // Имя события которое срабатывает при $(this).triggerHandler(...)
                if (descriptor.eventName === undefined) descriptor.eventName = property;

                //Пароноидальная шизофрения сотой степени :), далее идут абсолютно бессмысленные записи

                // Зависимости от других свойств
                if (descriptor.dependence === undefined) descriptor.dependence = undefined;
                // Значение по умолчанию
                if (descriptor.defValue === undefined) descriptor.defValue = undefined;

                if (descriptor.converter === undefined) descriptor.converter = undefined;

                // Для данного свойства можно переопределить функцию сериализации
                // Например это может потребоваться в том случае если с сервера значение приходит в одном формате
                // а на клиенте он преобразуется в другой формат
                if (descriptor.fnSerialize === undefined) descriptor.fnSerialize = undefined;

                return __s_createBoth(property, descriptor);
            },
            /**
             * @context Static Class
             */
            __s_createBoth = function (property, descriptor) {
                var isFunction = $.isFunction,
                    eventName = descriptor.eventName,
                    get = descriptor.get,
                    set = descriptor.set,
                    beforeSet = descriptor.fnBeforeSet,
                    afterSet = descriptor.fnAfterSet;
                /**
                 * @context Prototype
                 */
                return function GetterOrSetter(value) {
                    var me = this,
                        meClass = me.Class,
                        fnGet = function (desc) {
                            // Если геттер переопределен внутри __property как функция значит вызовем ее
                            // иначе проверим в массиве __s_defGetters
                            //      если там найдем функцию с именем определенным в get значит вызовем ее
                            // иначе просто вернем значение
                            return isFunction(get)
                                ? get.call(me, desc)
                                : !!__s_defGetters[get] && isFunction(__s_defGetters[get])
                                ? __s_defGetters[get].call(me, desc)
                                : me[desc.field];
                        },
                        oldValue = fnGet(descriptor),
                        fnSet = function (desc, val) {
                            // Если cеттер переопределен внутри __property как функция значит вызовем ее
                            // иначе проверим в массиве __s_defSetters
                            //      если там найдем функцию с именем определенным в set значит вызовем ее
                            // иначе просто запишем переданное значение
                            isFunction(set)
                                ? val = set.call(me, desc)
                                : !!__s_defSetters[set] && isFunction(__s_defSetters[set])
                                ? val = __s_defSetters[set].call(me, desc)
                                : me[desc.field] = val;

                            return val;
                        },
                        fnBeforeSet = function (val) {
                            // Если функция переопределена значит вызовем ее иначе просто вернем значение
                            return isFunction(beforeSet) ? beforeSet.call(me, val) : val;
                        },
                        fnAfterSet = function (val) {
                            // Если функция переопределена значит вызовем ее иначе просто вернем значение
                            return isFunction(afterSet) ? afterSet.call(me, val) : val;
                        },
                        triggerPropertyEvent = function (val) {
                            // Если класс не находится в режиме инициализации то тригнем событие изменения свойства
                            if (!me.__initializing) {
                                $(me).triggerHandler(eventName, val);
                            }
                            return this;
                        };

                    // Если value не переданно - значит хотят получить значение,
                    // используя getter возвращаем значение
                    if (value === undefined)
                        return fnGet(descriptor);

                    // Если value переданно как функция - значит хотят подписаться на данное свойство
                    // Делаем подписку и возвращаем функцию отписки от события
                    if (isFunction(value)) {
                        me.__bind(eventName, value);
                        return function unBinder(value) {
                            this.__unbind(eventName, value);
                        }
                    }

                    // Если переданное значение не равно текущему то
                    // Вызовем цепочку функций fnBeforeSet, fnSet, fnAfterSet, triggerPropertyEvent
                    // И вернем this
                    if (value !== oldValue) {
                        return triggerPropertyEvent(fnAfterSet(fnSet(descriptor, fnBeforeSet(value))));
                    }
                }
            },
            /**
             * @context Static Class
             */
            __s_initDependenceProperty = function () {
                var me = this,
                    props = me._property,
                    key;

                if (!$.isArray(__s_dependenceProperty)) {
                    __s_dependenceProperty = [];
                }
                for (key in props) {
                    __s_prepareProperty(key);
                }
            },
            /**
             * @context Static Class
             */
            __s_prepareProperty = function (key) {
                try {
                    var me = this,
                        dep = me._property[key],
                        depMark = me._property[key].mark,
                        shortName = me.shortName,
                        pType,
                        type,
                        types;

                    //Если свойство серое -> кидаем ошибку.
                    if (depMark == 'gray') {
                        new Error("Обнаружена циклическая зависимость");
                    }

                    //Если свойство black -> return
                    if (depMark == 'black') {
                        return;
                    }

                    //1) Маркируем свойство серым
                    me._property[key].mark = 'gray';

                    if (!!dep.dependence) {
                        dep = dep.dependence;
                        pType = $.type(dep);
                        if (pType == 'array') {
                            types = dep;
                            for (type in types) {
                                __s_prepareProperty(types[type]);
                            }
                        } else if (pType == 'string') {
                            __s_prepareProperty(dep);
                        }
                    }
                } catch (error) {

                }

                if (__s_dependenceProperty[shortName] === undefined)
                    __s_dependenceProperty[shortName] = [];

                __s_dependenceProperty[shortName].push(key);
                me._property[key].mark = 'black';
            },
            /**
             * @context Static Class
             */
            __s_clearMarkProperty = function () {
                var me = this, key;
                for (key in me._property) {
                    me._property[key].mark = 'none';
                }
            };


        /**
         * @class Dark.Model
         */
        $.Class("Dark.Model",
            {
                /**
                 * Псевдонимы текущей модели.
                 * Данное свойство не обязательное.
                 * @protected
                 */
                _alias:[ 'Model' ],
                /**
                 * Данное свойство содержит значения свойств класса - переданные ему в setup.
                 * @protected
                 */
                _property:undefined,

                /**
                 * Метод вызывается в момент когда произошла загрузка данного скрипта.
                 * По сути - статическая инициализация данного класса
                 * @link http://javascriptmvc.com/docs.html#!jQuery.Class.static.setup
                 * @public
                 *
                 * @param {Object} baseClass Базовый класс, от которого наследуются
                 * @param {String} fullName Полное имя текущего класса
                 * @param {Object} staticProps Статические свойства и методы текущего класса
                 * @param {Object} protoProps Прототипные свойства и методы текущего класса
                 */
                setup: function (baseClass, fullName, staticProps, protoProps) {
                    var me = this,
                        meProperty,
                        prop;
                    __s_addStore.call(me);

                    if (me._property === baseClass._property)
                        me._property = meProperty = {};

                    for (prop in meProperty) {
                        if (meProperty.hasOwnProperty(prop))
                            me.prototype[prop] = __s_initProperty.call(me, prop, meProperty[prop]);
                    }

                    if (baseClass._property)
                        me._property = $.extend({}, baseClass._property, meProperty);

                    __s_initDependenceProperty.call(me);
                    __s_clearMarkProperty.call(me);
                }

            },
            {
                __initializing:false,

                setup:function (attributes) {
                    this.__initializing = true;

                    this.__initializing = false;
                },

                init:function () {

                }
            }
        );
    }
);
