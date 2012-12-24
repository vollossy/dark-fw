module("Action Tests", {
    config: {
        action : {
            cType : 'Action',
            params: []
        }
    },

	setup: function(){

	}
});

test("Add / Set / Get Param Property Test", function(){
    var action = $.toComponent(this.config.action);

    action.params()
        .set("prop1", "value1")
        .set("prop2", "value2")
        .set("prop3", "value3");

    action.params().add("value4");

    equals(action.params().get("prop3"), "value3");
    equals(action.params().get(3), "value4");
    equals(action.params().count(), 4);
});
