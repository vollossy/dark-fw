steal(
    '../model.js',
    function () {
        /**
         * @description Класс обработчик событий. Может быть переданн с сервера к любому компоненту.
         *              Когда срабатывает любое событие - вызывается обработчик подписаный на имя этого события.
         *
         * @class Dark.Models.Utils.Handler
         * @inherits Dark.Model
         *
         * @author Константин Родионов ( Проколенко )
         * @author Konstantin.R.Dark
         */
        Dark.Model("Dark.Models.Utils.Handler",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Array}
                 */
                _alias:[ "Handler" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @protected
                 * @add Dark.Model.Static
                 * @var {Object}
                 */
                _property:{
                    /**
                     * @description Имя события по которому срабатывает данный обработчик
                     * @public
                     * @add Dark.Models.Utils.Handler.Prototype
                     * @var {Object}
                     *
                     * @function eventName
                     * @param {String}
                     * @return {String}
                     */
                    eventName: {}
                }
            },
            /* @Prototype */
            {

            }
        );
    }
);
