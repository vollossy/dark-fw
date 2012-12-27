/*
 * @page index Dark
 * @tag home
 *
 * ###Little Dark-fw
 */
steal(
    'dark-fw/plugin'

    ,'dark-fw/styles/bootstrap.min.css'
    ,'./dark-fw.css'

    ,'dark-fw/models/actions/client_script_action.js'
    ,'dark-fw/models/utils/collection.js'

    ,'dark-fw/controllers/components/buttons/button_controller.js'
    ,'dark-fw/controllers/components/containers/container_controller.js'

    ,function(){
        $(document).ready(function(){
            var component = $.toComponent({
                    cType: 'Button',
                    text: 'button1'
                }),
                controller;

            $.createController(component, $('#playGround'));


        });
    }
);