<?php
error_reporting(E_ALL);
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="ru">
    <head>
        <title>Sandbox</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script src="client/core/javascriptMVC/steal/steal.js?/client/core/bootstrap.js,development"></script>
    </head>
    <body>
        <script type="text/javascript">
            steal(
                function(){
                    $(document).ready(function(){
                        var component = $.toComponent({
                                cType : 'Component',
                                css: [
                                    'class-1',
                                    'class-2',
                                    'class-3',
                                    'class-4',
                                    'class-5'
                                ],
                                styles: {
                                    'margin' : '10px',
                                    'padding' : '10px'
                                }
                            }),
                            cb = function (element, event){
                                console.log('callback - ' + component.cssToSting())
                            },
                            unbind = component.css(cb);

                        console.log(component.stylesToSting());

                        component.css().add('class-6');
                        component.css().add('class-7');
                        component.css().removeElement('class-3');

                        unbind(cb);
                        component.css().add('class-8');
                        console.log(component.cssToSting())
                    });
                }
            );
        </script>
    </body>
</html>

