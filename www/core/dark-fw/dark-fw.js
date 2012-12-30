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

    ,'dark-fw/controllers/components/buttons/button_controller.js'
    ,'dark-fw/controllers/components/buttons/drop_down_button_controller.js'
    ,'dark-fw/controllers/components/containers/container_controller.js'
    ,'dark-fw/controllers/components/containers/drop_down_container_controller.js'
    ,'dark-fw/controllers/components/links/link_component_controller.js'

    ,function(){
        $(document).ready(function(){
            var component = $.toComponent({
                cType: 'Container',
                items: [
                    {
                        cType: 'Button',
                        text: 'Кнопка 1',
                        action: {
                            cType: 'ClientScriptAction',
                            script: 'alert("work");'
                        }
                    },
                    {
                        cType: 'DropDownButton',
                        text: "Кнопка 2",
                        action: {
                            cType: 'ClientScriptAction',
                            script: 'alert("work");'
                        },
                        dropDown: {
                            cType: 'DropDownContainer',
                            layout: {
                                cType: 'VLayout'
                            },
                            items: [
                                {
                                    cType: 'LinkItem',
                                    text: 'link item',
                                    status: 'success',
                                    href: '#hrefChangeLinkItem'
                                },
                                {
                                    cType: 'LinkItem',
                                    text: 'link item',
                                    status: 'success',
                                    href: '#hrefNoChangeLinkItem',
                                    action: {
                                        cType: 'ClientScriptAction',
                                        script: 'alert("Href no changed use only action not controller");'
                                    }
                                },
                                {
                                    cType: 'LinkComponent',
                                    text: 'link component href change',
                                    status: 'important',
                                    onlyModel: false,
                                    href: '#hrefChangeLinkComponent'
                                },
                                {
                                    cType: 'LinkComponent',
                                    text: 'link component',
                                    status: 'important',
                                    onlyModel: false,
                                    href: '#hrefNoChangeLinkComponent',
                                    action: {
                                        cType: 'ClientScriptAction',
                                        script: 'alert("Href no changed use only action");'
                                    }
                                }
                            ]
                        }
                    },
                    {
                        cType: 'DropDownButton',
                        text: "Кнопка 3",
                        action: {
                            cType: 'ClientScriptAction',
                            script: 'alert("work");'
                        },
                        dropDown: {
                            cType: 'DropDownContainer',
                            layout: {
                                cType: 'VLayout'
                            },
                            items: [
                                {
                                    cType: 'LinkItem',
                                    text: 'link item',
                                    status: 'success',
                                    href: '#hrefChangeLinkItem'
                                },
                                {
                                    cType: 'LinkItem',
                                    text: 'link item',
                                    status: 'success',
                                    href: '#hrefNoChangeLinkItem',
                                    action: {
                                        cType: 'ClientScriptAction',
                                        script: 'alert("Href no changed use only action not controller");'
                                    }
                                },
                                {
                                    cType: 'LinkComponent',
                                    text: 'link component href change',
                                    status: 'important',
                                    onlyModel: false,
                                    href: '#hrefChangeLinkComponent'
                                },
                                {
                                    cType: 'LinkComponent',
                                    text: 'link component',
                                    status: 'important',
                                    onlyModel: false,
                                    href: '#hrefNoChangeLinkComponent',
                                    action: {
                                        cType: 'ClientScriptAction',
                                        script: 'alert("Href no changed use only action");'
                                    }
                                }
                            ]
                        }
                    }

                ]}),
                controller;

            $.createController(component, $('#playGround'));


        });
    }
);