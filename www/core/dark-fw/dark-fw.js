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
                });

            component.items().setStackMode();
            $.createController(component, $('#playGround'));
            component.items().add(button);
        });
    }
);