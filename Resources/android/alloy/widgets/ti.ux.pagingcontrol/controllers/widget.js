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
    var dots = {
        active: 0,
        total: 0,
        views: []
    };
    WTools.setTiProps(args, $.view);
    $.linkScrollableView = function(scrollable) {
        if (!scrollable || !scrollable.views) {
            Ti.API.warning("WARNING: ti.ux.pagingcontrol.linkScrollableView(): scrollable not found or does not contain views");
            return;
        }
        var countViews = scrollable.views.length;
        var views = [];
        for (var i = 0; countViews > i; i++) {
            views.push(Alloy.createWidget("ti.ux.pagingcontrol", "dot", {
                left: 8 * i
            }).getView());
            $.view.add(views[i]);
            views[i].deactivate();
        }
        dots.views = views;
        dots.total = countViews;
        countViews && $.setActiveDot(0);
        views[0].activate();
    };
    $.setActiveDot = function(index) {
        if (dots.views[index]) {
            dots.views[dots.active].deactivate();
            dots.views[index].activate();
            dots.active = index;
        }
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;