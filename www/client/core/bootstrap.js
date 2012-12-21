steal.then(
    'steal/less'                   // less
)
.then(
    '../core/models/model.js'
)
.then(
    function(){
        $(document).ready(function(){

        });
    }
);