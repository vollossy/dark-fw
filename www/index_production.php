<?php
error_reporting(E_ALL);
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="ru">
    <head>
        <title>Sandbox Production</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script type='text/javascript' src='core/steal/steal.production.js?dark-fw/dark-fw.js'></script>
        <link rel="stylesheet" href="css/sandbox.css" type="text/css"/>
        <script type='text/javascript' src='js/prettify/prettify.js'></script>
    </head>
    <body>
        <div>
            <div id="playGround"></div>
            <script type="text/javascript">
                function bootstrap(){
                    if( !!window.$ ){
                        var container = {
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
                                                    {
                                                        cType: 'TextItem',
                                                        tag: 'h3',
                                                        text: 'Поля для ввода'
                                                    },
                                                    {
                                                        cType: 'TextItem',
                                                        tag: 'h5',
                                                        text: 'Поле для ввода текстовых значений'
                                                    },

                                                    {
                                                        cType: 'Container',
                                                        css: ['bs-docs-example'],
                                                        items: [
                                                            {
                                                                cType: 'StringField',
                                                                name: 'string1',
                                                                formName: 'tf',
                                                                value: "test"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        cType: 'TextItem',
                                                        tag: 'h5',
                                                        text: 'IntegerField'
                                                    },
                                                    {
                                                        cType: 'Container',
                                                        css: ['bs-docs-example'],
                                                        items: [
                                                            {
                                                                cType: 'IntegerField',
                                                                name: 'integer1',
                                                                formName: 'tf',
                                                                value: 0
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        cType: 'Container',
                                                        items: [
                                                            {
                                                                cType: 'TextItem',
                                                                tag: 'div',
                                                                text: '<strong>Установленны свойства min и max:</strong>'
                                                            },
                                                            {
                                                                cType: 'Container',
                                                                css: ['bs-docs-example'],
                                                                items: [
                                                                    {
                                                                        cType: 'IntegerField',
                                                                        name: 'integer2',
                                                                        formName: 'tf',
                                                                        value: 0,
                                                                        min: 0,
                                                                        max: 10
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                cType: 'TextItem',
                                                                tag: 'div',
                                                                text: '<pre class="prettyprint linenums">' +
                                                                    "{\r\n" +
                                                                    "   cType: 'IntegerField',\r\n" +
                                                                    "   name: 'integer2',\r\n" +
                                                                    "   value: 0,\r\n" +
                                                                    "   min: 0,\r\n" +
                                                                    "   max: 10\r\n" +
                                                                    "}\r\n" +
                                                                    '</pre>'
                                                            },

                                                        ]
                                                    },

                                                    {
                                                        cType: 'Container',
                                                        css: ['bs-docs-example'],
                                                        items: [
                                                            {
                                                                cType: 'DateField',
                                                                label: 'test',
                                                                name: 't3',
                                                                formName: 'tf',
                                                                value: ""
                                                            },
                                                            {
                                                                cType: 'DateRangeField',
                                                                label: 'test',
                                                                name: 't4',
                                                                formName: 'tf',
                                                                value: ""
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            };

                        $.createController($.toComponent(container), $('#playGround'));
                        window.prettyPrint && prettyPrint();
                    }else{
                        setTimeout(bootstrap, 10);
                    }
                }

                setTimeout(bootstrap, 10);
            </script>
        </div>
    </body>
</html>

