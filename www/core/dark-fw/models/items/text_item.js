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
                    tag: 'span',
                    text: "",
                    icon: '',
                    iconPosition: 'left',
                    status: "default",
                    onlyModel: true,
                    useDragHandler: 'F'
                },

                setup: function(baseClass, fullName, staticProps, protoProps){
                    var me = this,
                        aliases = me._alias,
                        i = 0, cnt = aliases.length,
                        alias,
                        scope = function(aliasOuter){
                            var alias = aliasOuter;
                            return function(){ return this.cType() === alias};
                        };

                    this._super(baseClass, fullName, staticProps, protoProps);

                    for( ; i!=cnt; ){
                        alias = aliases[i++];
                        me.prototype['is' + alias] = scope.call(this, alias)
                    }
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

                /**
                 * Возвращает html для отображения иконки
                 * @return {String}
                 * @private
                 */
                _getIconHtml: function(){
                    var me = this,
                        icon = me.icon(),
                        positionLeft = me.isIconPositionLeft(),
                        html = '<i class="icon-' + icon + '"></i>';
                    return icon ? positionLeft ? html + ' ' : ' ' + html : "";
                },

                isIconPositionLeft: function(){
                    return this.iconPosition() === 'left';
                },

                isIconPositionRight: function(){
                    return this.iconPosition() === 'right';
                },

                /**
                 * Возвращает html для отображения внутри кнопки. Иконка, префикс, текст
                 * @return {String}
                 * @private
                 */
                _getInnerHtml: function(){
                    var me = this,
                        text = me.text(),
                        icon = me._getIconHtml(),
                        iconPositionIsLeft = me.isIconPositionLeft();
                    return (iconPositionIsLeft ? icon : "") + text + (iconPositionIsLeft ? "" : icon);
                },

                getHtmlElement: function(){
                    var me = this,
                        tag = me.isLabelItem() || me.isBadgeItem() ? 'span' : me.tag(),
                        css = me.isLabelItem() ? 'label' : me.isBadgeItem() ? 'badge' : "text";

                    return '<'+tag+' class="' + css + ' ' + css+'-'+me.status() + '">' + me._getInnerHtml() + '</'+tag+'>'
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
