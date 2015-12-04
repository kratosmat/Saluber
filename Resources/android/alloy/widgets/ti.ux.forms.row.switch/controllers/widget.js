function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.forms.row.switch/" + s : s.substring(0, index) + "/ti.ux.forms.row.switch/" + s.substring(index + 1);
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
        if (args.icon) {
            $.icon.setIcon(args.icon);
            args.iconColor && ($.icon.getView().color = args.iconColor);
        } else $.titleLbl.left = $.icon.getView().left;
        $.titleLbl.text = args.title || "";
    }
    function initValues() {
        var value = "true" === args.value || true == args.value;
        Ti.API.debug("value: " + value);
        $.switchControl.value = value;
        $.value = value;
        $.switchControl.extra = args.extra;
    }
    new (require("alloy/widget"))("ti.ux.forms.row.switch");
    this.__widgetId = "ti.ux.forms.row.switch";
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
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.icon = Alloy.createWidget("ti.ux.iconfont", "widget", {
        id: "icon",
        __parentSymbol: $.__views.row
    });
    $.__views.icon.setParent($.__views.row);
    $.__views.titleLbl = Ti.UI.createLabel({
        id: "titleLbl"
    });
    $.__views.row.add($.__views.titleLbl);
    $.__views.switchControl = Ti.UI.createSwitch({
        id: "switchControl"
    });
    $.__views.row.add($.__views.switchControl);
    $.__views.__alloyId2 = Ti.UI.createView({
        id: "__alloyId2"
    });
    $.__views.row.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    $.id = args.id || "switch";
    initUI();
    initValues();
    exports.addEventListener = function(name, cb) {
        return $.switchControl.addEventListener(name, cb);
    };
    exports.removeEventListener = function(name, cb) {
        return $.switchControl.removeEventListener(name, cb);
    };
    exports._hasListenersForEventType = function(name, flag) {
        return $.switchControl._hasListenersForEventType(name, flag);
    };
    $.getValue = function() {
        return $.switchControl.value;
    };
    $.setValue = function(value) {
        $.switchControl.value = value;
        $.value = value;
    };
    $.getExtraData = function() {
        return $.switchControl.extra;
    };
    require("WidgetTools").cleanArgs(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;