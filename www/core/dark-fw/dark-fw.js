/*
 * @page index Dark
 * @tag home
 *
 * ###Little Dark-fw
 */
window.DarkLoaded  = false;
steal(
    './methods.js'
).then(
    'dark-fw/styles/bootstrap.css'
    ,'dark-fw/styles/jquery.ui.bootstrap.core.css'
    ,'dark-fw/styles/jquery.ui.bootstrap.datepicker.css'
    ,'./dark-fw.css'

    ,'dark-fw/models/actions/client_script_action.js'
    ,'dark-fw/models/utils/collection.js'
    ,'dark-fw/models/managers/drag_and_drop_manager.js'
    ,'dark-fw/models/managers/form_manager.js'

    ,'dark-fw/controllers/components/buttons/button_controller.js'
    ,'dark-fw/controllers/components/buttons/drop_down_button_controller.js'
    ,'dark-fw/controllers/components/buttons/drop_down_split_button_controller.js'

    ,'dark-fw/controllers/components/containers/container_controller.js'
    ,'dark-fw/controllers/components/containers/drop_down_container_controller.js'
    ,'dark-fw/controllers/components/containers/button_toolbar_container_controller.js'
    ,'dark-fw/controllers/components/containers/button_group_container_controller.js'
    ,'dark-fw/controllers/components/links/link_component_controller.js'

    ,'dark-fw/controllers/components/forms/form_controller.js'

    ,'dark-fw/controllers/components/fields/string_field_controller.js'
    ,'dark-fw/controllers/components/fields/integer_field_controller.js'
    ,'dark-fw/controllers/components/fields/date_field_controller.js'
    ,'dark-fw/controllers/components/fields/date_range_field_controller.js'
    ,'dark-fw/controllers/components/fields/check_box_field_controller.js'
).then(
    'dark-fw/views/core/components/buttons/button.ejs'
    ,'dark-fw/views/core/components/buttons/drop_down_button.ejs'
    ,'dark-fw/views/core/components/buttons/drop_down_split_button.ejs'
    ,'dark-fw/views/core/components/containers/container.ejs'
    ,'dark-fw/views/core/components/containers/drop_down_container_container.ejs'
    ,'dark-fw/views/core/components/fields/fieldWrapper.ejs'
    ,'dark-fw/views/core/components/fields/date_field.ejs'
    ,'dark-fw/views/core/components/fields/date_range_field.ejs'
    ,'dark-fw/views/core/components/fields/integer_field.ejs'
    ,'dark-fw/views/core/components/fields/string_field.ejs'
    ,'dark-fw/views/core/components/fields/check_box_field.ejs'
).then(
    function(){
        window.DarkLoaded = true;
    }
);