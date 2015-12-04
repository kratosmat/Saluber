function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.alignview/" + s : s.substring(0, index) + "/ti.ux.alignview/" + s.substring(index + 1);
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
    function init() {
        WTools.setTiProps(args, $.view);
        drawChildren(args.children);
        WTools.cleanArgs(args);
    }
    function drawChildren(children) {
        var views = [];
        if (!children || 0 === children.length) return;
        for (var i = 0, j = children.length; j > i; i++) {
            if (!children[i]) continue;
            views.push(children[i]);
            $.view.add(children[i]);
        }
        $.childrenViews = views;
        setTimeout(sortChildren, 200);
    }
    function sortChildren() {
        var views = $.childrenViews;
        var w = 0, factor = 0;
        if (args.width) {
            w = args.width;
            factor = .5;
        } else {
            w = $.view.rect.width;
            factor = 1;
        }
        var distance = w / views.length;
        for (var i = 0, j = views.length; j > i; i++) {
            views[i].left = distance * (i + factor) - views[i].rect.width / 2 - distance / 2;
            Ti.API.info("width element " + views[i].rect.width + " w " + w + " distance: " + distance + " final left: " + views[i].left);
        }
    }
    new (require("alloy/widget"))("ti.ux.alignview");
    this.__widgetId = "ti.ux.alignview";
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
    $.__views.view = Ti.UI.createView({
        id: "view"
    });
    $.__views.view && $.addTopLevelView($.__views.view);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    var WTools = require("WidgetTools");
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;