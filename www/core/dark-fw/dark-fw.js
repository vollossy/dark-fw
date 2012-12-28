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
    ,'dark-fw/controllers/components/links/link_component_controller.js'

    ,function(){
        $(document).ready(function(){
            var component = $.toComponent({
                    cType: 'Container',
                    layout: {
                        cType: 'VLayout'
                    },
                    items: [
                        {
                            cType: 'TextItem',
                            text: 'text item',
                            status: 'inverse'
                        },
                        {
                            cType: 'LabelItem',
                            text: 'label item',
                            status: 'info'
                        },
                        {
                            cType: 'BadgeItem',
                            text: 'badge item',
                            status: 'warning'
                        },
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
                        },
                        {
                            cType: 'ActionItem',
                            text: 'action item',
                            action: {
                                cType: 'ClientScriptAction',
                                script: 'alert("Only action");'
                            }
                        },
                        {
                            cType: 'CheckedItem',
                            text: 'checked item',
                            unCheckAction: {
                                cType: 'ClientScriptAction',
                                script: 'alert("unCheckAction action");'
                            },
                            action: {
                                cType: 'ClientScriptAction',
                                script: 'alert("Check action");'
                            }
                        }
                    ]
                }),
                controller;

            $.createController(component, $('#playGround'));


        });
    }
);