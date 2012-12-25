module("Component Tests", {
    config: {
        model : $.toComponent({
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
        })
    },

	setup: function(){

	}
});

test("Default Value Test", function(){
    var component = this.config.model;

    equals(component.visible(), true, "defValue == 'T' == true");
    equals(component.id(), component.id(), "defValue == function");

});

test("Visible Test", function(){
    var component = this.config.model;

    component.visible(false);
    equals(component.visible(), false, "okay. скрыть - component.visible(false)");
    component.visible(true);
    equals(component.visible(), true, "okay. показать - component.visible(true)");

    component.hide();
    equals(component.visible(), false, "okay. скрыть - component.hide() === component.visible(false)");
    component.show();
    equals(component.visible(), true, "okay. показать - component.show() === component.visible(true)");

    component.toggleVisible();
    equals(component.visible(), false, "okay. переключаемся с показать на скрыть - component.toggleVisible()");
    component.toggleVisible();
    equals(component.visible(), true, "okay. переключаемся со скрыть на показать - component.toggleVisible()");

});

test("Css property Test", function(){
    var css = [
            'class-1',
            'class-2',
            'class-3',
            'class-4',
            'class-5'
        ],
        component = $.toComponent({
            cType : 'Component',
            css: css
        });

    equals(component.css().toArray().join(', '), css.join(', '), "");
    component.css().add('class-6');
    equals(component.css().toArray().join(', '), [ 'class-1', 'class-2', 'class-3', 'class-4', 'class-5', 'class-6' ].join(', '), "okay. Добавили в свойство css значение == class-6");

});

test("Bind / Unbind / Trigger event to property Test", function(){
    var component = this.config.model,
        countEvent = 0,
        cb = function (element, event){
            countEvent++;
            ok(true, 'Cобытие ' + countEvent + ': изменилось свойство component.css(). Увеличиваем счетчик произошедших событий на + 1');
        },
        unbind = component.css(cb);

    ok(true, 'Подписались на изменения свойства component.css()');
    ok(true, 'Произведем три изменения свойства component.css() : add, add, removeElement');

    component.css().add('class-6');
    component.css().add('class-7');
    component.css().removeElement('class-3');

    unbind(cb);
    ok(true, 'Отписались от изменения свойства component.css()');

    component.css().add('class-8');
    ok(true, 'Изменили свойство component.css() добавив новое значение');

    equals(countEvent, 3, "Произошло три события, последнее добавление было после того как мы отписались от изменений свойства component.css(). Поэтому счетчик не увеличился, и остался равен трем.")

});
