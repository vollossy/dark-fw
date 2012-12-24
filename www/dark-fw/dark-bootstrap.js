steal(
	'steal/less', 			// application CSS file
	'./dark-fw.css', 			// application CSS file

    './core/models/actions/client_script_action.js',
	'./core/models/components/component.js',
	'./core/models/utils/collection.js'

).then(function(){					// configure your application
    console.log('load all');
    $(document).ready(function(){
        var component = $.toComponent({
            cType : 'Component',
            visible: false,
            handlers: [
                {
                    cType: 'Handler',
                    _isModel: true,
                    eventName: 'visible',
                    script: "console.log('Work', this);"
                }
            ]
        });
        component.show();
    });
});