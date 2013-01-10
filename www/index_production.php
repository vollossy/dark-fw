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
        <script type='text/javascript'>
            window.totalTime = 0;
            function Timer(){
                this.time = 0;
            }

            Timer.prototype.start = function(){
                this.time = new Date().valueOf();
                return this;
            };
            Timer.prototype.end = function(text){
                $('#log').append('<div>' + text + " : " + (new Date().valueOf() - this.time) + "</div>");
                return this;
            };
            Timer.prototype.endTime = function(text){

                var number = new Date().valueOf() - this.time;
                console.log(window.totalTime + number);
                return number;
            };
        </script>
        <script type='text/javascript' src='js/prettify/prettify.js'></script>
        <script type='text/javascript' src='js/bootstrap.js'></script>
    </head>
    <body>
        <div>
            <div id="log"></div>
            <div id="playGround"></div>
        </div>
    </body>
</html>

