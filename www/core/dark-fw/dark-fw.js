/*
 * @page index Dark
 * @tag home
 *
 * ###Little Dark-fw
 */
steal(
    './dark-fw.css'
    ,'dark-fw/plugin'

    ,'dark-fw/styles/bootstrap.min.css'

    ,'dark-fw/models/actions/client_script_action.js'
    ,'dark-fw/models/utils/collection.js'

    ,'dark-fw/controllers/components/buttons/button_controller.js'
    ,'dark-fw/controllers/components/containers/container_controller.js'

    ,function(){
        $(document).ready(function(){
            var button = $.toComponent({ cType: 'Button', text: 'button4' }),
                component = $.toComponent({
                    cType : 'Container',
                    items: [
                        { cType: 'Button', text: 'button1' },
                        { cType: 'Button', text: 'button2' },
                        { cType: 'Button', text: 'button3' }
                    ]
                }),
                controller;

            component.items().setStackMode();
            $.createController(component, $('#playGround'));
            // Todo нужно так же завести событие по изменению режима со стека на очередь

            component.items().set(1, button);
            component.items().removeElement(button);

            setTimeout(function(){
                console.log('refresh');
                component.items().setQueueMode();
            }, 3000)
        });
    }
);