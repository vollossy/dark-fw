steal.then(
    'steal/less'                   // less
)
.then(
    '../core/models/actions/action.js',
    '../core/models/utils/collection.js',
    '../core/models/components/component.js'
)
.then(
    function(){
        $(document).ready(function(){

        });
    }
);