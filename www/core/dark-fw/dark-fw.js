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
            var button = $.toComponent({ cType: 'Button', text: 'button2' }),
                VLayout = $.toComponent({ cType: 'VLayout' }),
                component = $.toComponent({
                    cType : 'Container',
                    height: 500,
                    layout: {
                        cType: 'HLayout'
                    },
                    items: [
                        {
                            cType : 'Container',
                            styles: {
                                'background-color' : '#D1D1D1'
                            },
                            items: [
                                [{ cType: 'Button', text: 'button1' }, { cType: 'LayoutInfo' }],
                                { cType: 'Button', text: 'button3' }
                            ]
                        },
                        {
                            cType : 'Container',
                            styles: {
                                'background-color' : '#D2D2D2'
                            },
                            items: [
                                [{ cType: 'Button', text: 'button1' }, { cType: 'LayoutInfo' }],
                                { cType: 'Button', text: 'button3' }
                            ]
                        },
                        {
                            cType : 'Container',
                            styles: {
                                'background-color' : '#D3D3D3'
                            },
                            items: [
                                [{ cType: 'Button', text: 'button1' }, { cType: 'LayoutInfo' }],
                                { cType: 'Button', text: 'button3' }
                            ]
                        }
                    ]
                }),
                controller;

            $.createController(component, $('#playGround'));

//            console.log(component.layout().__container() === component );
//            component.layout().align('left');

            // Todo нужно так же завести событие по изменению режима со стека на очередь
//            button.setDisplayInline();
//            component.items().set(1, button);
//            component.items().removeElement(button);
//
//            setTimeout(function(){
//                console.log('refresh');
//                component.items().setQueueMode();
//            }, 3000)
// Test на изменение масштаба
//            setTimeout(function(){
//                console.log('change scale mini');
//                button.setScaleMini();
//                setTimeout(function(){
//                    console.log('change scale small');
//                    button.setScaleSmall();
//                    setTimeout(function(){
//                        console.log('change scale default');
//                        button.setScaleDefault();
//                        setTimeout(function(){
//                            console.log('change scale large');
//                            button.setScaleLarge();
//                            setTimeout(function(){
//                                console.log('change scale default');
//                                button.setScaleDefault();
//                            }, 3000)
//                        }, 3000)
//                    }, 3000)
//                }, 3000)
//            }, 3000)
        });
    }
);