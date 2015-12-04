function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.iconbutton/" + s : s.substring(0, index) + "/ti.ux.iconbutton/" + s.substring(index + 1);
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
        WTools.setTiProps(args, $.btn);
        $.init(args);
        WTools.cleanArgs(args);
    }
    new (require("alloy/widget"))("ti.ux.iconbutton");
    this.__widgetId = "ti.ux.iconbutton";
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
    $.__views.btn = Ti.UI.createButton({
        color: "#669",
        backgroundColor: "none",
        id: "btn"
    });
    $.__views.btn && $.addTopLevelView($.__views.btn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    var WTools = require("WidgetTools");
    var IconicFont = require(WPATH("IconicFont")), fontawesome = new IconicFont({
        font: WPATH("FontAwesome")
    });
    $.getCharMap = function() {
        return fontawesome.font.charcode || {};
    };
    $.setIcon = function(codename) {
        $.btn.title = fontawesome.icon(codename);
    };
    $.init = function(argsInit) {
        $.btn.font = {
            fontSize: args.size || 24,
            fontFamily: fontawesome.fontfamily
        };
        argsInit.iconColor && ($.btn.color = args.iconColor);
        argsInit.icon && ($.btn.title = fontawesome.icon(args.icon));
    };
    initUI();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;