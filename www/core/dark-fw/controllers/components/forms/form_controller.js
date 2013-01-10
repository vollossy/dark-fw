steal(
    '../../../models/components/forms/form.js',
    '../containers/container_controller.js',
    function () {
        /**
         * @class Dark.Controllers.Components.Forms.FormController
         * @alias FormController
         * @inherits Dark.Controllers.Components.Containers.ContainerController
         * @parent Dark.Controllers.Components.Containers.ContainerController
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Controllers.Components.Containers.ContainerController("Dark.Controllers.Components.Forms.FormController",
            /* @Static */
            {//Static
                tmpl:{},

                css:{

                }
            },
            /* @Prototype */
            {//Prototype
                /******************************************************************************************************
                 * Protected methods
                 *****************************************************************************************************/
                /**
                 *
                 * @protected
                 * @return {Object}
                 */
                _subscribeToProperty:function () {
                    return $.extend(this._super(), {

                    });
                },

                /******************************************************************************************************
                 * Public methods
                 *****************************************************************************************************/
                render:function () {
                    var me = this;
                    me._super();
                    me.element.addClass('form-' + me.component.fieldLayout());
                },

                destroy:function () {
                    var me = this;
                    Dark.Models.Managers.FormManager.getInstance().unsetForm(this);
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