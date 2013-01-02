steal(
    './editor.css'
    ,'../dark-fw/dark-fw.js'
).then(
    function(){
        $(document).ready(function(){
            var ddManager = Dark.Models.Managers.DragAndDropManager.getInstance(),
                dropHandler = function(event, ui){
                    var event = event,
                        selfElement = $(event.target),
                        ui = ui,
                        cType = ui.draggable.attr('cType'),
                        cTypeLayout = ui.draggable.attr('cTypeLayout'),
                        handlers = {
                            Container: {
                                create: function(){
                                    return { cType: cType, layout: {cType: cTypeLayout} }
                                }
                            },
                            ButtonToolbarContainer: {
                                create: function(){
                                    return { cType: cType, layout: {cType: cTypeLayout} }
                                }
                            },
                            ButtonGroupContainer: {
                                create: function(){
                                    return { cType: cType, layout: {cType: cTypeLayout} }
                                }
                            },
                            Button: {
                                create: function(){
                                    var text = prompt('Текст кнопки', "Кнопка");
                                    return { cType: cType, tag: 'a', text: !!text ? text : "Кнопка" }
                                }
                            },
                            LinkComponent: {
                                create: function(){
                                    var text = prompt('Текст ссылки', "Ссылка");
                                    return { cType: cType, text: !!text ? text : "Ссылка" }
                                }
                            }
                        };

                    return {
                        create: function(){
                            var handler = handlers[cType],
                                raw = handler.create();
                            raw.useDragHandler = true;
                            return $.toComponent(raw);
                        }
                    }
                },
                dropFn = function( event, ui ) {
                    if($.data(ui.draggable[0], 'component') ){
                        var model = ddManager.getCurrentComponent(),
                            parentContainer = ddManager.getParentComponent();
                        parentContainer.items().removeElement(model);
                    }

                    var moveEl,
                        handler = new dropHandler(event, ui),
                        $this = $.getComponentById($(this).attr('id'));

                    model = !!model ? model : handler.create();

                    $this.items().add(model);

                    moveEl = $('#' + model.id());

                    if( $.isFunction(model.items) ){
                        moveEl.droppable({ hoverClass: "drop-hover", greedy: true, drop: dropFn });
                    }
                };

            $( ".view-item" ).draggable({ helper: "clone" });
            $.createController($.toComponent({ cType: 'Container', layout: { cType: 'VLayout' } }), $( "#page" ))
                .element.droppable({ hoverClass: "drop-hover", greedy: true, drop: dropFn });
        });
    }
);