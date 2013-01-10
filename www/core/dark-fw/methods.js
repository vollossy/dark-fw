/*
 * @page index Dark
 * @tag home
 *
 * ###Little Dark-fw
 */
steal(
    'jquery/jquery.js',
    function(){
        window.DarkStore = {};

        $.isUndefined = function(value){
            return value === undefined;
        };
        $.isString = function(object){
            return Object.prototype.toString.call(object) == "[object String]";
        };
        $.isRawComponent = function(raw){
            return !!raw.cType && !$.isFunction(raw.cType);
        };
        $.isComponent = function(raw){
//            return raw instanceof Dark.Model;
            return !!raw.cType && $.isFunction(raw.cType)
        };
        $.isCollection = function(raw){
            return raw instanceof Dark.Models.Utils.Collection;
        };
        $.toManyComponent = function(raw){
            var i = 0, cnt, a = [];

            raw = !$.isArray(raw) ? [raw] : raw;

            for( cnt = raw.length; i != cnt; ){
                a.push($.toComponent(raw[i++]));
            }

            raw = a;
            return raw;
        };
        $.toComponent = function(raw){
            //!steal-remove-start
            var e1 = 'model.js -> $.toManyComponent - ' +
                    'В метод можно передавать только сырую модель компонента или экземпляр компонента.' +
                    'Передали typeof = ' + typeof raw,
                e2 = 'model.js -> $.toComponent - ' +
                    'instanceClass === undefined. ' +
                    'Возможные причины : ' +
                    '1) Пытаемся создать класс который еще не загрузился. ' +
                    '2) Передали неизвестный cType с сервера';
            if( !$.isRawComponent(raw) && !$.isComponent(raw) )
                throw new Error(e1);

            //!steal-remove-end

            if( $.isRawComponent(raw) ){
                var type = raw.cType,
                    name, instanceClass;

                name = window.DarkStore.M[type];

                //!steal-remove-start
                if ( name === undefined )
                    throw new Error(e2);
                //!steal-remove-end

                instanceClass = $.String.getObject(name);

                //!steal-remove-start
                if ( instanceClass === undefined ) throw new Error(e2);
                //!steal-remove-end

                raw = instanceClass.newInstance(raw);

            }

            return raw;
        };
        $.createController = function(model, element){
            model = $.isRawComponent(model) ? $.toComponent(model) : model;
            element = $(element);

            var name = window.DarkStore.C[model.cType() + 'Controller'],
                instanceClass;

            //!steal-remove-start
            if ($.isUndefined(name))
                throw new Error("Cannot read property 'shortName' of undefined");
            //!steal-remove-end

            instanceClass = $.String.getObject(name);

            //!steal-remove-start
            if ($.isUndefined(instanceClass))
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

    }
)