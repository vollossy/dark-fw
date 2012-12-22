steal.then(
    'steal/less'                   // less
)
.then(
    '/client/core/models/actions/action.js',
    '/client/core/models/utils/collection.js',
    '/client/core/models/components/component.js'
)
.then(
    function(){
        $(document).ready(function(){

        });
    }
);