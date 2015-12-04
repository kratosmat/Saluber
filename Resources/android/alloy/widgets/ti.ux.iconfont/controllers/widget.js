function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.iconfont/" + s : s.substring(0, index) + "/ti.ux.iconfont/" + s.substring(index + 1);
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
        WTools.setTiProps(args, $.iconLbl);
        $.init(args);
        WTools.cleanArgs(args);
    }
    new (require("alloy/widget"))("ti.ux.iconfont");
    this.__widgetId = "ti.ux.iconfont";
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
    $.__views.iconLbl = Ti.UI.createLabel({
        id: "iconLbl"
    });
    $.__views.iconLbl && $.addTopLevelView($.__views.iconLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var WTools = require("WidgetTools");
    var IconicFont = require(WPATH("IconicFont")), fontawesome = new IconicFont({
        font: WPATH("FontAwesome")
    });
    $.getCharMap = function() {
        return fontawesome.font.charcode || {};
    };
    $.setIcon = function(codename) {
        $.iconLbl.text = fontawesome.icon(codename);
    };
    $.init = function(argsInit) {
        $.iconLbl.font = {
            fontSize: args.size || 24,
            fontFamily: fontawesome.fontfamily
        };
        argsInit.iconColor && ($.iconLbl.color = args.iconColor);
        argsInit.icon && ($.iconLbl.text = fontawesome.icon(args.icon));
    };
    exports.hide = function() {
        $.iconLbl.hide();
    };
    initUI();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;