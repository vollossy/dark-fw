steal(
    '../../../models/components/containers/editor_container.js',
    '../../../../dark-fw/controllers/components/containers/container_controller.js',
    'jquery/ui/jquery-ui-1.9.2.custom.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Containers.EditorContainerController
         * @alias EditorContainerController
         * @inherits Dark.Controllers.Components.Containers.ContainerController
         * @parent Dark.Controllers.Components.Containers.ContainerController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Containers.ContainerController("Dark.Controllers.Components.Containers.EditorContainerController",
            /* @Static */
            {//Static
                tmpl:{},

                css:{}
            },
            /* @Prototype */
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                _useSort: false,
                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this;
                    me._super();
                    me.element
                        .droppable({
                            over: me.proxy('dropOver'),
                            out: me.proxy('dropOut'),
                            drop: me.proxy('drop')
                        })
                        .sortable({
                            items: '> .dark-container-wrap > .dark-container-item',
                            start: me.proxy('sortStart'),
                            stop: me.proxy('sortStop')
                        })
                        .disableSelection();
                },

                sortStart: function(event, ui){
                    this._useSort = true;
                    console.log( 'sortStart', ui )
                },

                sortStop: function(event, ui){
                    this._useSort = false;
                    console.log( 'sortStop', ui );
                },

                dropOver: function(event, ui){
                    console.log( 'dropOver', ui );
                },

                dropOut: function(event, ui){
                    console.log( 'dropOut', ui );
                },

                drop: function(event, ui){
                    if( !this._useSort ){
                        var self = $(this);
                        self.removeClass('over-drag');
                        this.component.items().add($.toComponent({ cType: ui.draggable.attr('cType'), 'text' : 'test'}));
                    }
                },

                destroy:function () {
                    var me = this;
                    me._super();
                }

            }
            //!steal-remove-start
            /* @Getters */
            , {}
            /* @Setters */
            , {}
            //!steal-remove-end
        );
    }
);