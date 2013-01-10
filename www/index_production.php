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
    </head>
    <body>
        <div>
            <div id="playGround"></div>
            <script type="text/javascript">
                function bootstrap(){
                    if( !!window.$ ){
                        var field = $.toComponent({
                                cType: 'DateRangeField',
                                label: 'test',
                                name: 't4',
                                formName: 'tf',
                                value: ""
                            }),
                            form = $.toComponent({
                                cType   : 'Form',
                                name    : 'tf',
                                items   : [
                                    {
                                        cType: 'StringField',
                                        label: 'test',
                                        name: 't1',
                                        formName: 'tf',
                                        value: "test"
                                    },
                                    {
                                        cType: 'IntegerField',
                                        label: 'test',
                                        name: 't2',
                                        formName: 'tf',
                                        step: 3,
                                        value: 0,
                                        min: 0,
                                        max: 10
                                    },
                                    {
                                        cType: 'DateField',
                                        label: 'test',
                                        name: 't3',
                                        formName: 'tf',
                                        value: ""
                                    },
                                    field
                                ]
                            });
                        $.createController(form, $('#playGround'));
                    }else{
                        setTimeout(bootstrap, 10);
                    }
                }
                setTimeout(bootstrap, 10);
            </script>
        </div>
    </body>
</html>

