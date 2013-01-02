<?php
error_reporting(E_ALL);
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="ru">
    <head>
        <title>Sandbox</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!--        <script type='text/javascript' src='lib/javascriptMVC/steal/steal.production.js?../../dark-fw/dark-bootstrap.js'></script>-->
        <script type='text/javascript' src='core/steal/steal.js?editor/editor.js'></script>
    </head>
    <body>
        <div id="viewport-editor">
            <div id="viewport-toolbar">
                <div class="navbar navbar-inverse">
                    <div class="navbar-inner">
                        <ul class="nav">
                            <li class="active"><a href="#">Home</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="work-area" class="editorMode">
                <div id="page"></div>
            </div>
            <div id="component-list" class="well">
                <ul class="nav nav-list">
                    <li class="nav-header">Настройки</li>
                    <li class="nav-header"><a href="#"><input type="checkbox" checked="checked" onclick="$('#work-area').toggleClass('editorMode');">Стиль редактора</a></li>
                    <li class="divider"></li>
                    <li class="nav-header">Контейнеры</li>
                    <li><a class="view-item" cType="Container" cTypeLayout="VLayout" href="#">Container VLayout</a></li>
                    <li><a class="view-item" cType="Container" cTypeLayout="HLayout" href="#">Container HLayout</a></li>
                    <li><a class="view-item" cType="ButtonToolbarContainer" cTypeLayout="HLayout" href="#">ButtonToolbarContainer</a></li>
                    <li><a class="view-item" cType="ButtonGroupContainer" cTypeLayout="HLayout" href="#">ButtonGroupContainer</a></li>
                    <li class="nav-header">Кнопки</li>
                    <li><a class="view-item" cType="Button" href="#">Button</a></li>
                    <li class="nav-header">Items</li>
                    <li><a class="view-item" cType="LinkComponent" href="#">LinkComponent</a></li>
                </ul>
            </div>
        </div>
        <div>
            <div id="playGround"></div>
        </div>
    </body>
</html>

