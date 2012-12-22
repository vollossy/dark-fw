/*
 * Author: Konstantin "Konstantin.R.Dark" Prokolenko
 * E-mail: Konstantin.R.Dark@gmail.com
 * Copyright (c) 2012.
 */
steal(
    '../model.js',
    function () {
        var isArray = $.isArray,
            isPlainObject = $.isPlainObject,
            __EVENTS = {
                ADD     :  "addElementFromCollection",
                SET     : "setElementFromCollection",
                REMOVE  : "removeElementFromCollection"
            },
            /**
             * Создает для режима "Подписчики" коллекции подписок
             * @context prototype
             * @private
             *
             * @return {Class}
             */
            __p_activateObserversMode = function(){
                var me      = this,
                    binders = {};

                me.isObserversMode(true);

                binders[__EVENTS['ADD']] = DarkCollection.newInstance();
                binders[__EVENTS['SET']] = DarkCollection.newInstance();
                binders[__EVENTS['REMOVE']] = DarkCollection.newInstance();

                me._bindersCallbacks = binders;

                return me;
            },
            /**
             * Метод для подписки внешних callback
             * @context prototype
             * @private
             *
             * @param {String} eventNamePostfix Нaзвание события на которое подписываемся
             * @param {Function} callback Фенкция обратного вызова
             * @return {Class} Возвращаем this
             */
            __p_bindOuterEvents = function(eventNamePostfix, callback){
                var me = this;
                if( me.isObserversMode() ){
                    me._bindersCallbacks[__EVENTS[eventNamePostfix]].add(callback)
                }
                return me;
            },
            /**
             * Метод удаления подписки внешних callback
             * @context prototype
             * @private
             *
             * @param {String} eventNamePostfix Нaзвание события на которое подписываемся
             * @param {Function} callback Фенкция обратного вызова
             * @return {Class} Возвращаем this
             */
            __p_unbindOuterEvents = function(eventNamePostfix, callback){
                var me = this;
                if( me.isObserversMode() ){
                    me._bindersCallbacks[__EVENTS[eventNamePostfix]].removeElement(callback)
                }
                return me;
            },
            /**
             * Тригает произощедшее события
             * @context prototype
             * @private
             *
             * @param {String} eventNamePostfix Нaзвание события на которое подписываемся
             * @param {Class} item Елемент коллекции из за которого произошло событие
             */
            __p_triggerEvent = function(eventNamePostfix, item){
                $(this).triggerHandler(__EVENTS[eventNamePostfix], item);
            },
            /**
             * Проверяет есть ли переданный ключ в массиве соответсвия ключа объекта и ключа в коллекции
             * @context prototype
             * @private
             *
             * @param {Number} key ключ/индекс в коллекции
             * @return {Number}
             */
            __p_containObjKey = function(key){
                var objKeys = this.__objKey();
                return this.isString(key) && !!objKeys[key] ? objKeys[key] : false;
            },
            /**
             * Проверяет есть ли переданный ключ в инвертированном массиве
             * @context prototype
             * @private
             *
             * @param {Number} key ключ/индекс
             * @return {Boolean}
             */
            __p_containInvertKey = function(key){
                var invertedKeys = this.__iObjKey();
                return !!invertedKeys[key] ? invertedKeys[key] : false;
            },
            /**
             * Конвертирует переданный ключ в нужный числовой формат
             * @context prototype
             * @private
             *
             * @param {Number|String} key ключ/индекс в коллекции
             * @return {Number}
             */
            __p_convertKey = function(key){
                var me = this;
                return me.isString(key) && __p_containObjKey.call(me, key) ? me.__objKey()[key] : key;
            },
            /**
             * Конвертирует переданный ключ в нужный строковый формат
             * @context prototype
             * @private
             *
             * @param {Number} key ключ/индекс в коллекции
             * @return {Number}
             */
            __p_invertKey = function(key){
                var me = this,
                    invertedKeys = me.__iObjKey();
                return $.isNumeric(key)&& __p_containInvertKey.call(me, key) ? invertedKeys[key] : key;
            },
            /**
             * Возвращает стартовый индекс для перебора в зависимости от текущего режима ( стек или очередь )
             * @context prototype
             * @private
             *
             * @return {Number}
             */
            __p_getIdx = function(){
                return this.isStackMode() ? this.count()-1 : 0;
            },
            /**
             * Возвращает конечный индекс для перебора в зависимости от текущего режима ( стек или очередь )
             * @context prototype
             * @private
             *
             * @return {Number}
             */
            __p_getCnt = function(){
                return this.isStackMode() ? -1 : this.count();
            },
            /**
             * Возвращает следующий индекс для перебора в зависимости от текущего режима ( стек или очередь )
             * @context prototype
             * @private
             *
             * @param i
             * @return {*}
             */
            __p_getIterate = function(i){
                return this.isStackMode() ? --i : ++i;
            },
            /**
             * Удаляет елемент из коллекции
             * @context prototype
             * @private
             *
             * @param key
             * @return {Class}
             */
            __p_remove = function(key){
                var me = this,
                    elements = me._elements(),
                    convertKey, removedItem;
                if( me.containsKey(key) ){
                    convertKey = __p_convertKey.call(me, key);
                    removedItem = elements[convertKey];
                    elements.splice(convertKey, 1);

                    if( me.isString(key) ){
                        delete me.__objKey()[key];
                        delete me.__iObjKey()[convertKey];
                    }

                    __p_triggerEvent.call(this, 'REMOVE', removedItem);
                }

                return me;
            };

        /**
         * @class Dark.Models.Utils.Collection
         */
        Dark.Model.extend("Dark.Models.Utils.Collection",
            {
                _property:{
                    /**
                     * Список числовых значении и их соответсвие со строковым значением ключей
                     * По умолчанию пустой объект
                     * Только клиентское свойство
                     * @private
                     */
                    __iObjKey: {
                        defValue: '{}'
                    },
                    /**
                     * Список строковых ключей и их соответсвие в числовом значении
                     * По умолчанию пустой объект
                     * Только клиентское свойство
                     * @private
                     */
                    __objKey: {
                        defValue: '{}'
                    },
                    /**
                     * Текущий индекс смещения внутренного итератора коллекции
                     * По умолчанию 0
                     * Только клиентское свойство
                     * @private
                     */
                    __i: {
                        defValue: 0
                    },
                    /**
                     * Елементы коллекции
                     * По умолчанию пустой массив
                     * В конструктор данного класса в свойство _elements можно передать массив или простой объект
                     *
                     * @protected Приходит с сервера
                     */
                    _elements: {
                        convert: function(property, raw){
                            var me = this,
                                e = [],
                                prop,  pushed;

                            //!steal-remove-start
                            if( !isArray(raw) && !isPlainObject(raw) ){
                                throw Error('Dark.Models.Utils.Collection::_elements.convert - ' +
                                    'В свойство _elements можно передовать только массив или простой объект.' +
                                    'typeof = ' + typeof raw);
                            }
                            //!steal-remove-end

                            if( isPlainObject(raw) ){
                                for( prop in raw ){
                                    if( raw.hasOwnProperty(prop) ){
                                        pushed = e.push(raw[prop]);
                                        me.__objKey()[prop] = --pushed;
                                        me.__iObjKey()[pushed] = prop;
                                    }
                                }
                                raw = e;
                            }

                            return raw;
                        },
                        defValue: '[]',
                        dependence: ['__objKey', '__iObjKey']
                    },
                    /**
                     * Текущий режим коллекции, поддерживаются два режима - стек и очередь.
                     * По умолчанию активен режим "очереди"
                     *
                     * @protected Приходит с сервера
                     */
                    _mode: {  // queue | stack
                        defValue: 'queue'
                    },
                    /**
                     * Режим "Подписчики"
                     * По умолчанию выключен
                     *
                     * @public Приходит с сервера
                     */
                    isObserversMode: {
                        defValue: false
                    },
                    /**
                     * Режим "Молчание"
                     * По умолчанию выключен
                     *
                     * @public Приходит с сервера
                     */
                    isMuteMode: {
                        defValue: false
                    }
                }
            },
            {
                /**
                 * Коллекции callback подписчиков
                 */
                _bindersCallbacks: undefined,

                /**
                 * Инициализация класса
                 */
                init: function(){
                    var me = this,
                        binders = {},
                        cb = '_callbackTriggerEvent';
                    me._super();

                    if( me.isObserversMode() ){
                        __p_activateObserversMode.call(me)
                    }
                    binders[__EVENTS.ADD] = me.callback(cb);
                    binders[__EVENTS.SET] = me.callback(cb);
                    binders[__EVENTS.REMOVE] = me.callback(cb);

                    $(this).bind(binders);
                },
                /**
                 * Вызывает callback для всех подписчиков если включен режим "подписчики" и не включен режим "молчания"
                 * @context prototype
                 * @private
                 *
                 * @param {Event} event событие
                 * @param {Class} item Елемент коллекции из за которого произошло событие
                 */
                _callbackTriggerEvent: function(event, item){
                    var me = this;
                    if( me.isObserversMode() && !me.isMuteMode() && !me._initializing ){
                        me._bindersCallbacks[event.type].map(function(key, callback){
                            callback(event, item);
                        });
                    }
                },

                /**
                 * Вкючает режим "Подписчики"
                 * @public
                 * @return {Class}
                 */
                activateObserversMode: function(){
                    var me = this;
                    if( !me.isObserversMode() ){
                        __p_activateObserversMode.call(me);
                    }
                    return me;
                },

                /**
                 * Выключает режим "Подписчики"
                 * @return {Class}
                 */
                deactivateObserversMode: function(){
                    var me = this;

                    if( me.isObserversMode() ){
                        me.isObserversMode(false);

                        me._bindersCallbacks = undefined;
                    }

                    return me;
                },
                /******************************************************************************************************
                 *  Public prototype methods
                 *****************************************************************************************************/
                /**
                 * Устанавливает режим "стека" для коллекции
                 * @return {Class}
                 */
                setStackMode: function(){
                    return this._mode('stack');
                },

                /**
                 * Устанавливает режим "очереди" для коллекции
                 * @return {Class}
                 */
                setQueueMode: function(){
                    return this._mode('queue');
                },

                /**
                 * Проверяет находится ли коллекция в режиме "стека"
                 * @return {Boolean}
                 */
                isStackMode: function(){
                    return this._mode() === 'stack';
                },

                /**
                 * Проверяет находится ли коллекция в режиме "очереди"
                 * @return {Boolean}
                 */
                isQueueMode: function(){
                    return this._mode() === 'queue';
                },

                /**
                 * Возвращает значения коллекции в виде массива
                 * @return {Array}
                 */
                toArray: function(){
                    return this._elements();
                },

                /**
                 * Устанавливает внутренний итератор на первый елемент в коллекции и возвращает его
                 * @return {Object}
                 */
                first: function(){
                    var me = this;
                    me.__i(0);
                    return me.get(me.__i())
                },

                /**
                 * Устанавливает внутренний итератор на последний елемент в коллекции и возвращает его
                 * @return {Object}
                 */
                last: function(){
                    var me = this;
                    me.__i(me.count() - 1);
                    return me.get(me.__i())
                },

                /**
                 * Устанавливает внутренний итератор на следующий елемент в коллекции от текущего и возвращает его
                 * @return {Object}
                 */
                next: function(){
                    var me = this,
                        index = me.__i();
                    me.__i(++index);
                    return me.get(index)
                },

                /**
                 * Устанавливает внутренний итератор на предидущий елемент в коллекции от текущего и возвращает его
                 * @return {*}
                 */
                prev: function(){
                    var me = this,
                        index = me.__i();
                    me.__i(--index);
                    return me.get(index)
                },

                /**
                 * Возвращает текущий елемент в коллекции на который ссылается внутренний итератор
                 * @return {*}
                 */
                current: function(){
                    return this.get(this.__i())
                },

                /**
                 * Можно ли дальше смещать массив.
                 * @return {Boolean}
                 */
                valid: function(){
                    return this.__i() < this.count();
                },

                /**
                 * Возвращает ключ/индекс текущего елемента в коллекции на который ссылается внутренний итератор
                 * @return {Number}
                 */
                key: function(){
                    return __p_invertKey.call(this, this.__i());
                },

                /**
                 * Удаляет елемент из коллекции по переданному ключ/индекс
                 * @param {Number|String} key ключ/индекс в коллекции
                 * @return {*|Null} Возвращает удаленный елемент или null если таковой отсутвовал в коллекции
                 */
                remove: function(key){
                    var me = this,
                        removed = me.get(key);

                    __p_remove.call(me, key);

                    return removed;
                },

                /**
                 * Удаляет елемент из коллекции, если таковой будет найден
                 * @param {Object} element елемент
                 * @return {*|Null} Возвращает удаленный елемент или null если таковой отсутвовал в коллекции
                 */
                removeElement: function(element){
                    var me = this,
                        removed = false;

                    me.each(function(key, el){
                        if( el === element ){
                            __p_remove.call(me, key);
                            removed = el;
                            return false;
                        }
                    });
                    return removed;
                },

                /**
                 * Проверяет наличие переданного ключа/индекса в коллекции
                 * @param {Number|String} key ключ/индекс в коллекции
                 * @return {Boolean} Если ключ есть вернет TRUE иначе FALSE
                 */
                containsKey: function(key){
                    return this._elements()[__p_convertKey.call(this, key)] !== undefined;
                },

                /**
                 * Проверяет наличие переданного елемента в коллекции.
                 * Внимание сравнение происходит через ===
                 * @param {Object} element елемент
                 * @return {Boolean} Если елемент есть вернет TRUE иначе FALSE
                 */
                contains: function(element){
                    var contains;
                    this.map(function(key, el){
                        if( el === element ) contains = true;
                    });
                    return contains;
                },

                /**
                 * Возвращает елемент по ключу/индексу
                 * @param {Number|String} key ключ/индекс в коллекции
                 * @return {Object|undefined}
                 */
                get: function(key){
                    var me = this;
                    return me.containsKey(key) ? me._elements()[__p_convertKey.call(me, key)] : undefined;
                },

                /**
                 * Возвращает массив всех ключей/индексов коллекции
                 * @return {Array}
                 */
                getKeys: function(){
                    var me = this,
                        a = [];
                    me.map(function(key, val){
                        a.push(key);
                    });

                    return a;
                },
                /**
                 * Возвращает массив всех елементов коллекции
                 * @return {Array}
                 */
                getValues: function(){
                    return this._elements();
                },
                /**
                 * Возвращает колличество елементов в коллекции
                 * @return {Number}
                 */

                count: function(){
                    return this._elements().length;
                },
                /**
                 * Проверяет пустая ли коллекция
                 * @return {Boolean} Если коллекция пустая вернет true иначе false
                 */
                isEmpty: function(){
                    return !!this.count();
                },

                /**
                 * Очищает коллекцию
                 * @return {Class} Возвращает себя
                 */
                clear: function(){
                    return this._elements([]).__objKey({}).__iObjKey({});
                },

                /**
                 * Устанавливает елемент в коллекцию по ключу
                 * @param key ключ
                 * @param element Добавляемый елемент
                 * @return {Class} Возвращает себя
                 */
                set: function(key, element){
                    var me = this,
                        elements = me._elements(),
                        pushed;

                    if( !me.contains(element) ){
                        pushed = elements.push(element);

                        if( me.isString(key) ){
                            this.__objKey()[key] = --pushed;
                            this.__iObjKey()[pushed] = key;
                        }
                        me._elements(elements);
                        __p_triggerEvent.call(me, 'SET', element);
                    }

                    return me;
                },

                /**
                 * Добавляет елемент в коллекцию
                 * @param element Добавляемый елемент
                 * @return {Class} Возвращает себя
                 */
                add: function(element){
                    var me = this,
                        elements = me._elements();

                    if( !me.contains(element) ){
                        elements.push(element);
                        me._elements(elements);
                        __p_triggerEvent.call(me, 'ADD', element);
                    }

                    return me;
                },

                /**
                 * Возвращает текущую пару ключ/значение из массива с вызовом callback для каждого елемента.
                 * В callback передаются два параметра - ключ/индекс и елемент
                 * @param {Function} callback Функция обратного вызова
                 * @return {Class} Возвращает себя
                 */
                map: function(callback){
                    var me = this,
                        i = __p_getIdx.call(me), cnt = __p_getCnt.call(me);

                    for( ; i != cnt; ){
                        callback.call(me, __p_invertKey.call(me, i), me.get(i));
                        i = __p_getIterate.call(me, i);
                    }

                    return me;
                },

                /**
                 * Возвращает текущую пару ключ/значение из массива с вызовом condition для каждого елемента.
                 * Функция возвращает массив результатов которые вернулись из condition с проверкой на false
                 * В callback передаются два параметра - ключ/индекс и елемент
                 * @param {Function} condition Функция обратного вызова
                 * @return {Array} Возвращает массив результатов которые вернулись из condition с проверкой на false
                 */
                grep: function(condition){
                    var me = this,
                        i = __p_getIdx.call(me), cnt = __p_getCnt.call(me),
                        el,
                        returned,
                        a = [];

                    for( ; i != cnt; ){
                        el =  me.get(i);
                        returned = condition.call(me, __p_invertKey.call(me, i), el);
                        if( returned !== false ) a.push(el);
                        el = undefined;
                        i = __p_getIterate.call(me, i);
                    }

                    return a;
                },

                /**
                 * Возвращает текущую пару ключ/значение из массива и смещает его указатель с вызовом callback для каждого елемента.
                 * В callback передаются два параметра - ключ/индекс и елемент
                 * @param {Function} callback Функция обратного вызова
                 * @return {Class} Возвращает себя
                 */
                each: function(callback){
                    var me = this,
                        i = __p_getIdx.call(me), cnt = __p_getCnt.call(me);

                    me.first();

                    for( ; i != cnt; ){
                        if( callback.call(me, __p_invertKey.call(me, i), me.get(i)) === false ){
                            break;
                        }
                        me.next();
                        i = __p_getIterate.call(me, i);
                    }

                    return me;
                },
                /******************************************************************************************************
                 *  Events prototype methods
                 *****************************************************************************************************/
                /**
                 * Подписаться на все доступные события коллекции
                 * @param {Function} callback Функция обратного вызова
                 */
                bindWithAllEvent: function(callback){
                    var me = this;
                    __p_bindOuterEvents.call(me, 'ADD', callback);
                    __p_bindOuterEvents.call(me, 'SET', callback);
                    return __p_bindOuterEvents.call(me, 'REMOVE', callback)
                },

                /**
                 * Подписаться на событие добавления нового елемента в коллекцию
                 * @param {Function} callback Функция обратного вызова
                 */
                bindWithAddEvent: function(callback){
                    return __p_bindOuterEvents.call(this, 'ADD', callback)
                },

                /**
                 * Подписаться на событие установки елемента в коллекцию
                 * @param {Function} callback Функция обратного вызова
                 */
                bindWithSetEvent: function(callback){
                    return __p_bindOuterEvents.call(this, 'SET', callback)
                },

                /**
                 * Подписаться на событие удаления елемента из коллекции
                 * @param {Function} callback Функция обратного вызова
                 */
                bindWithRemoveEvent: function(callback){
                    return __p_bindOuterEvents.call(this, 'REMOVE', callback)
                },

                /**
                 * Отписаться от всех доступных событий коллекции
                 * @param {Function} callback Функция обратного вызова
                 */
                unbindWithAllEvent: function(callback){
                    var me = this;
                    __p_unbindOuterEvents.call(me, 'ADD', callback);
                    __p_unbindOuterEvents.call(me, 'SET', callback);
                    return __p_unbindOuterEvents.call(me, 'REMOVE', callback);
                },

                /**
                 * Отписаться от события добавления нового елемента в коллекцию
                 * @param {Function} callback Функция обратного вызова
                 */
                unbindWithAddEvent: function(callback){
                    return __p_unbindOuterEvents.call(this, 'ADD', callback)
                },

                /**
                 * Отписаться от события установки елемента в коллекцию
                 * @param {Function} callback Функция обратного вызова
                 */
                unbindWithSetEvent: function(callback){
                    return __p_unbindOuterEvents.call(this, 'SET', callback)
                },

                /**
                 * Отписаться от события удаления елемента из коллекции
                 * @param {Function} callback Функция обратного вызова
                 */
                unbindWithRemoveEvent: function(callback){
                    return __p_unbindOuterEvents.call(this, 'REMOVE', callback)
                }
            }
        );
    }

);
