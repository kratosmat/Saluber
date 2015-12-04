function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.iconlabel/" + s : s.substring(0, index) + "/ti.ux.iconlabel/" + s.substring(index + 1);
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
    function initUI() {
        $.setText(args.text);
        $.setIcon(args.icon);
        args.color && $.setColor(args.color);
    }
    new (require("alloy/widget"))("ti.ux.iconlabel");
    this.__widgetId = "ti.ux.iconlabel";
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
    $.__views.viewContainer = Ti.UI.createView({
        id: "viewContainer"
    });
    $.__views.viewContainer && $.addTopLevelView($.__views.viewContainer);
    $.__views.icon = Alloy.createWidget("ti.ux.iconfont", "widget", {
        id: "icon",
        __parentSymbol: $.__views.viewContainer
    });
    $.__views.icon.setParent($.__views.viewContainer);
    $.__views.label = Ti.UI.createLabel({
        id: "label"
    });
    $.__views.viewContainer.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    var WTools = require("WidgetTools");
    WTools.setTiProps(args, $.viewContainer);
    $.setText = function(str) {
        $.label.text = str || "";
    };
    $.setColor = function(color) {
        $.label.color = color;
        $.icon.getView().color = color;
    };
    $.setIcon = function(iconcode) {
        $.icon.setIcon(iconcode);
    };
    initUI();
    WTools.cleanArgs(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;