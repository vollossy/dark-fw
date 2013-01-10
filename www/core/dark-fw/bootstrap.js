(function(){
    var sandbox = (function(){
            var modelToString = function(model){
                    var str = "", value;
                    for( var i in model ){
                        str += str === "" ? "{\r\n" : ",\r\n";
                        if( model.hasOwnProperty(i) ){
                            value = model[i];
                            str += "    " + i + " : " + ($.isString(value) ? "'" + value + "'" : value);
                        }
                    }
                    str += "\r\n}";
                    return str;
                },
                modelsToString = function(models){
                    var result = "";
                    for( var i = 0, cnt = models.length; i != cnt; i++){
                        if( i !== 0 ) result += ",\r\n";
                        result += modelToString(models[i]);
                    }
                    return result;
                };
            return {
                textItem : function(text, tag){
                    var item = { cType: 'TextItem', text: text };

                    if( tag ) item.tag = tag;

                    return item;
                },
                pageHeader: function(text){
                    return this.textItem(text, 'h1')
                },
                sectionHeader: function(text){
                    return this.textItem(text, 'h3')
                },
                exampleHeader: function(text){
                    return this.textItem(text, 'div')
                },
                exampleDescription: function(text){
                    return this.textItem(text, 'div')
                },
                exampleBlock : function(header, models){
                    var me = this,
                        isArray = $.isArray(models),
                        itemsText = isArray ? modelsToString(models) : modelToString(models);

                    if( !isArray ){
                        models = [models];
                    }
                    models.unshift(me.exampleHeader(header));

                    return {
                        cType: 'Container',
                        items: [
                            {
                                cType: 'Container',
                                css: ['bs-docs-example'],
                                items: models
                            },
                            me.textItem('<pre class="prettyprint linenums">' + itemsText + '</pre>', 'div')
                        ]
                    }
                }
            };
        }()),
        container = {
            cType: 'Container',
            layout: { cType: 'HLayout', align: 'layout-align-stretch' },
            items: [
                {
                    cType: 'Container',
                    layout: { cType: 'VLayout' },
                    width: 200,
                    items: [
                        {
                            cType: 'TextItem',
                            text: '' +
                                '<ul class="nav nav-list">' +
                                '   <li class="nav-header">Примеры</li>'+
                                '   <li class="Поля"><a href="#">Поля</a></li>'+
                                '</ul>'
                        }
                    ]
                },
                {
                    cType: 'Container',
                    width: 84, size: '%',
                    items: [
                        {
                            cType   : 'Form',
                            name    : 'tf',
                            fieldLayout: "",
                            items   : [
                                sandbox.pageHeader('Поля для ввода'),
                                sandbox.sectionHeader('StringField'),
                                sandbox.exampleBlock(
                                    'Поле для ввода текста: ',
                                    {
                                        cType: 'StringField',
                                        name: 'string1',
                                        value: "test"
                                    }
                                ),
                                sandbox.sectionHeader('IntegerField'),
                                sandbox.exampleBlock(
                                    'Вывод без параметров: ',
                                    {
                                        cType: 'IntegerField',
                                        name: 'integer1',
                                        value: 0
                                    }
                                ),
                                sandbox.exampleBlock(
                                    'Установленны свойства <strong>min</strong> и <strong>max</strong>:',
                                    {
                                        cType: 'IntegerField',
                                        name: 'integer2',
                                        value: 3,
                                        min: 0,
                                        max: 10
                                    }
                                ),
                                sandbox.exampleBlock(
                                    'Установлено свойство <strong>step</strong>:',
                                    {
                                        cType: 'IntegerField',
                                        name: 'integer2',
                                        value: 3,
                                        step: 2
                                    }
                                ),
                                sandbox.exampleBlock(
                                    'Поля для ввода даты',
                                    [
                                        {
                                            cType: 'DateField',
                                            name: 'datefield',
                                            value: '2013-01-10 20:43:37'
                                        },
                                        {
                                            cType: 'DateRangeField',
                                            name: 'daterangefield',
                                            value: ""
                                        }
                                    ]
                                )
                            ]
                        }
                    ]
                }
            ]
        },
        item = {
            cType: 'CheckBoxField',
            name: 'test',
            label: "Выбор",
            value: {
                checked: true,
                data: 'test'
            }
        };

    $.createController($.toComponent(item), $('#playGround'));
    window.prettyPrint && prettyPrint();
}());