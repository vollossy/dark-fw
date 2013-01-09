/*
 * @page index Dark
 * @tag home
 *
 * ###Little Dark-fw
 */
steal(
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

    ,function(){
        var field = $.toComponent({
                cType: 'DateField',
                label: 'test',
                name: 't3',
                formName: 'tf',
                value: ""
            }),
            form = $.toComponent({
                cType   : 'Form',
                name    : 'tf',
                items   : [
                    {
                        cType: 'StringField',
                        label: 'test',
                        name: 't1',
                        formName: 'tf',
                        value: "test"
                    },
                    {
                        cType: 'IntegerField',
                        label: 'test',
                        name: 't2',
                        formName: 'tf',
                        step: 3,
                        value: 0,
                        min: 0,
                        max: 10
                    },
                    field
                ]
            });
        $.createController(form, $('#playGround'));

        /*
         var manager = Dark.Models.Managers.FieldManager.getInstance(),
         clear = function(){
         if( !!window.field ) delete window.field;
         if( !!window.form1 ) manager.unsetForm(form1);
         if( !!window.form2 ) manager.unsetForm(form2);
         };

         clear();

         var field = $.toComponent({
         cType: 'Field',
         name: 'tf',
         value: 'str',
         fieldInfo: {
         cType: 'FieldInfo',
         value: 'str1'
         }
         }),
         form1 = $.toComponent({
         cType: 'Form',
         name: 'tff1',
         items: []
         }),
         form2 = $.toComponent({
         cType: 'Form',
         name: 'tff2',
         items: []
         }),
         log = function(){
         console.log('-------------------------------------- LOG ----------------------------------------');
         console.log(manager);
         console.log('---  Field  ---');
         console.log(field);
         console.log('value : ' + field.value());
         console.log('---  Form 1  ---');
         console.log(form1);
         console.log('fields : ', form1.getFields());
         console.log('values : ', form1.getValues());
         console.log('---  Form 2  ---');
         console.log(form2);
         console.log('fields : ', form2.getFields());
         console.log('values : ', form2.getValues());
         };

         field.formName('tff1');
         log();


         //log();
         */
    }
);