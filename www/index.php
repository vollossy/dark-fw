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
                        var loop = 0,
                            cb = function(request){
                                loop = request;
                                return request;
                            },
                            action = $.toComponent({
                                cType: 'Action',
                                jsCallback: 'var loop = 1; console.log(this); return loop;'
                            });

                        action.execute(cb, loop);
                        console.log(loop);
                    });
                }
            );
        </script>
    </body>
</html>

