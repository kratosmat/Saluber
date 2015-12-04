function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.expandabletext/" + s : s.substring(0, index) + "/ti.ux.expandabletext/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function expandText() {
        if (isExpanded) {
            $.view.height = originalHeight;
            $.row.height = originalHeight;
        } else {
            $.view.height = Ti.UI.SIZE;
            $.row.height = $.view.toImage().height;
        }
        isExpanded = !isExpanded;
    }
    new (require("alloy/widget"))("ti.ux.expandabletext");
    this.__widgetId = "ti.ux.expandabletext";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.view = Ti.UI.createView({
        id: "view"
    });
    $.__views.row.add($.__views.view);
    expandText ? $.addListener($.__views.view, "click", expandText) : __defers["$.__views.view!click!expandText"] = true;
    $.__views.label = Ti.UI.createLabel({
        top: 5,
        id: "label"
    });
    $.__views.view.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    var originalHeight = args.height;
    var isExpanded = false;
    args.text && ($.label.text = args.text);
    originalHeight && ($.view.height = originalHeight);
    $.setText = function(str) {
        $.label.text = str || "";
    };
    __defers["$.__views.view!click!expandText"] && $.addListener($.__views.view, "click", expandText);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;