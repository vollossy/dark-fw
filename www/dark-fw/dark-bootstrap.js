steal(
	'steal/less', 			// application CSS file
	'./dark-fw.css', 			// application CSS file

    './core/models/actions/client_script_action.js',
	'./core/models/components/component.js',
	'./core/models/utils/collection.js'

).then(function(){					// configure your application
    console.log('load all');
    $(document).ready(function(){
        var loop = 0,
            cb = function(request){
            loop = request;
                return request;
            },
            action = $.toComponent({
                cType: 'ClientScriptAction',
                script: {
                    cType: 'ClientScript',
                    _args: ['loop'],
                    _script: 'return ++loop;'
                }
            });

        action.execute(cb, loop);
        console.log(loop);
    });
});