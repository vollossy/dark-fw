steal(
    '../model.js',
    function () {
        /**
         * @class Dark.Models.Items.TextItem
         * @alias TextItem
         * @inherits Dark.Models.Model
         * @parent Dark.Models.Model
         * @author Константин "Konstantin.R.Dark" Родионов ( Проколенко ) Konstantin.R.Dark@gmail.com
         */
        Dark.Models.Model("Dark.Models.Items.TextItem",
            /* @Static */
            {
                /**
                 * @description Массив псевдонимов текущей модели.
                 * @hide
                 * @protected
                 */
                _alias:[ "TextItem", "LabelItem", "BadgeItem" ],

                /**
                 * @description Данное свойство содержит описания значении свойств класса - переданные ему в setup.
                 * @hide
                 * @protected
                 */
                _property:{
                    text: "",
                    status: "default",
                    onlyModel: true
                },

                setup: function(baseClass, fullName, staticProps, protoProps){
                    var me = this, aliases = me._alias, i = 0, cnt = aliases.length, alias;
                    this._super(baseClass, fullName, staticProps, protoProps);

                    for( ; i!=cnt; ){
                        alias = aliases[i++];
                        me.prototype['is' + alias] = this.isScope(alias)
                    }
                },

                isScope: function(aliasOuter){
                    var alias = aliasOuter;
                    return function(){ return this.cType() === alias};
                }
            },
            /* @Prototype */
            {
                isItem: function(){
                    return true;
                },

                isComponent: function(){
                    return false;
                },

                getHtmlElement: function(){
                    var me = this,
                        css = me.isLabelItem() ? 'label' : me.isBadgeItem() ? 'badge' : "item";

                    return '<span class="' + css + ' ' + css+'-'+me.status() + '">' + me.text() + '</span>'
                }
            }
            //!steal-remove-start
            /* @Getters */
            , {
                /**
                 * Проверяет является ли данный класс TextItem
                 * Метод создается динамически по alias
                 * @return {Boolean}
                 */
                isTextItem: function(){ return true; },
                /**
                 * Проверяет является ли данный класс LabelItem
                 * Метод создается динамически по alias
                 * @return {Boolean}
                 */
                isLabelItem: function(){ return true; },
                /**
                 * Проверяет является ли данный класс BadgeItem
                 * Метод создается динамически по alias
                 * @return {Boolean}
                 */
                isBadgeItem: function(){ return true; }
            }
            /* @Setters */
            , {}
            //!steal-remove-end
        );
    }
);
