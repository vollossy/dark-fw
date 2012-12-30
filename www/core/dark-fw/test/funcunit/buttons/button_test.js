module("Buttons Tests", {
    config: {
        button : {
            cType : 'Button',
            text  : "test"
        },
        div : false
    }

});

test("Text", function(){
    var button = $.toComponent(this.config.button),
        div = $.createController(button, $('<div></div>').appendTo('#testPlayGround')).element,
        text = button.text(),
        textChanged = "changed text";

    button.text(textChanged);
    equal(div.text(), textChanged);

    div.remove();
});

test("Display", function(){
    var button = $.toComponent(this.config.button),
        div = $.createController(button, $('<div></div>').appendTo('#testPlayGround')).element;

    button.display('inline');
    equal(div.is('.btn-block') ? 'btn-block' : "", "", "Изменяем свойство display == 'inline'. Класса .btn-block на this.element не должно быть.");

    button.display('block');
    equal(div.is('.btn-block') ? 'btn-block' : "", 'btn-block', "Изменяем свойство display == 'block'. Класс .btn-block на this.element должен быть.");

    div.remove();
});

test("Disabled", function(){
    var button = $.toComponent(this.config.button),
        div = $.createController(button, $('<div></div>').appendTo('#testPlayGround')).element;

    button.disabled(false);
    equal(div.is('.disabled') ? 'disabled' : "", '', "Изменяем свойство disabled == false. Класса .disabled на this.element не должно быть.");

    button.disabled(true);
    equal(div.is('.disabled') ? 'disabled' : "", 'disabled', "Изменяем свойство disabled == true. Класс .disabled на this.element должен быть.");

    div.remove();
});

test("TextPrefix", function(){
    var button = $.toComponent(this.config.button),
        div = $.createController(button, $('<div></div>').appendTo('#testPlayGround')).element;

    button.text("text");
    button.textPrefix("Prefix ");
    equal(div.text(), 'Prefix text', "Изменяем свойство textPrefix == 'text' и свойство textPrefix == 'Prefix '. Результат == 'Prefix text'");

    div.remove();
});

test("Icon + IconPosition", function(){
    var button = $.toComponent(this.config.button),
        div = $.createController(button, $('<div></div>').appendTo('#testPlayGround')).element;

    button.text("text");
    button.icon("ok");

    equal(div.html(), '<i class="icon-ok"></i> text', "Иконка слева от текста");
    button.iconPosition("right");
    equal(div.html(), 'text <i class="icon-ok"></i>', "Иконка справа от текста");

    div.remove();
});

test("Scale", function(){
    var button = $.toComponent(this.config.button),
        div = $.createController(button, $('<div></div>').appendTo('#testPlayGround')).element;

    button.scale('mini');
    equal(div.is('.btn-mini') ? 'btn-mini' : false, 'btn-mini', "Изменяем свойство scale == 'mini'");

    button.scale('small');
    equal(div.is('.btn-small') ? 'btn-small' : false, 'btn-small', "Изменяем свойство scale == 'small'");

    button.scale('default');
    equal(div.is('.btn-default') ? 'btn-default' : false, 'btn-default', "Изменяем свойство scale == 'default'");

    button.scale('large');
    equal(div.is('.btn-large') ? 'btn-large' : false, 'btn-large', "Изменяем свойство scale == 'large'");

    div.remove();
});
