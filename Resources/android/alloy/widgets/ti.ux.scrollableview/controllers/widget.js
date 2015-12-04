function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.scrollableview/" + s : s.substring(0, index) + "/ti.ux.scrollableview/" + s.substring(index + 1);
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
    function linkScrollableView() {
        $.scrollable.removeEventListener("postlayout", linkScrollableView);
        $.pagingControl.linkScrollableView($.scrollable);
    }
    function updatePagingControl(e) {
        $.pagingControl.setActiveDot(e.currentPage);
    }
    new (require("alloy/widget"))("ti.ux.scrollableview");
    this.__widgetId = "ti.ux.scrollableview";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId0 = [];
    $.__views.scrollable = Ti.UI.createScrollableView({
        views: __alloyId0,
        id: "scrollable",
        showPagingControl: "false",
        disableBounce: "true"
    });
    $.__views.scrollable && $.addTopLevelView($.__views.scrollable);
    linkScrollableView ? $.addListener($.__views.scrollable, "postlayout", linkScrollableView) : __defers["$.__views.scrollable!postlayout!linkScrollableView"] = true;
    updatePagingControl ? $.addListener($.__views.scrollable, "scrollEnd", updatePagingControl) : __defers["$.__views.scrollable!scrollEnd!updatePagingControl"] = true;
    $.__views.pagingControl = Alloy.createWidget("ti.ux.pagingcontrol", "widget", {
        id: "pagingControl",
        top: "0",
        __parentSymbol: __parentSymbol
    });
    $.__views.pagingControl && $.addTopLevelView($.__views.pagingControl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    var WTools = require("WidgetTools");
    WTools.setTiProps(args, $.scrollable);
    $.scrollable.disableBounce = args.disableBounce;
    args.children && ($.scrollable.views = args.children);
    __defers["$.__views.scrollable!postlayout!linkScrollableView"] && $.addListener($.__views.scrollable, "postlayout", linkScrollableView);
    __defers["$.__views.scrollable!scrollEnd!updatePagingControl"] && $.addListener($.__views.scrollable, "scrollEnd", updatePagingControl);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;