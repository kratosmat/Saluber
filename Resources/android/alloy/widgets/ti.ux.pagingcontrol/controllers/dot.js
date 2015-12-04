function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.pagingcontrol/" + s : s.substring(0, index) + "/ti.ux.pagingcontrol/" + s.substring(index + 1);
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
    new (require("alloy/widget"))("ti.ux.pagingcontrol");
    this.__widgetId = "ti.ux.pagingcontrol";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dot";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.view = Ti.UI.createView({
        id: "view"
    });
    $.__views.view && $.addTopLevelView($.__views.view);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    $.view.left = args.left;
    $.view.activate = function() {
        $.resetClass($.view, "view-pagingcontrol-dot view-pagingcontrol-dot-active");
        $.view.left = args.left;
    };
    $.view.deactivate = function() {
        $.resetClass($.view, "view-pagingcontrol-dot view-pagingcontrol-dot-inactive");
        $.view.left = args.left;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;