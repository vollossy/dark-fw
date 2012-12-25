steal(
    //!steal-remove-start
    function(){ console.log('start load models'); }
    //!steal-remove-end
    ,'steal/less'
    ,'./core/styles/bootstrap.min.css'

    ,'./core/models/actions/client_script_action.js'
	,'./core/models/utils/collection.js'

    //!steal-remove-start
    ,function(){ console.log('all models is loaded'); }
    //!steal-remove-end
).then(
    //!steal-remove-start
    function(){ console.log('start load controllers'); }
    //!steal-remove-end
    ,'jquery/controller/view'
    ,'./core/controllers/components/buttons/button_controller.js'

    //!steal-remove-start
    ,function(){ console.log('all controllers is loaded'); }
    //!steal-remove-end

).then(  //less

    //!steal-remove-start
    function(){
        console.log('start load less');
    }
    //!steal-remove-end

    ,'./core/styles/general.less'
//    ,'./core/styles/bootstrap/bootstrap.less'

    //!steal-remove-start
    ,function(){ console.log('all less is loaded'); }
    ,function(){ console.log('all dependency is loaded'); }
    //!steal-remove-end
    ,function(){					// configure your application
        $(document).ready(function(){
            var component = $.toComponent({
                cType : 'Button',
                text: "test"
            });

            $.createController(component, $('#playGround'));
        });
    }
);