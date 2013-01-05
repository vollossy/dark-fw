/*
 * @page index Dark
 * @tag home
 *
 * ###Little Dark-fw
 */
steal(
    'dark-fw/styles/bootstrap.css'
    ,'./dark-fw.css'

    ,'dark-fw/models/actions/client_script_action.js'
    ,'dark-fw/models/utils/collection.js'
    ,'dark-fw/models/managers/drag_and_drop_manager.js'
    ,'dark-fw/models/managers/form_manager.js'

    ,'dark-fw/models/components/forms/form.js'
    ,'dark-fw/models/components/fields/field.js'

    ,'dark-fw/controllers/components/buttons/button_controller.js'
    ,'dark-fw/controllers/components/buttons/drop_down_button_controller.js'
    ,'dark-fw/controllers/components/buttons/drop_down_split_button_controller.js'

    ,'dark-fw/controllers/components/containers/container_controller.js'
    ,'dark-fw/controllers/components/containers/drop_down_container_controller.js'
    ,'dark-fw/controllers/components/containers/button_toolbar_container_controller.js'
    ,'dark-fw/controllers/components/containers/button_group_container_controller.js'
    ,'dark-fw/controllers/components/links/link_component_controller.js'

    ,function(){

    }
);