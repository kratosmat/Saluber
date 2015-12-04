function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.image/" + s : s.substring(0, index) + "/ti.ux.image/" + s.substring(index + 1);
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
        REAL_TOP = args.realTop || 0;
        WTools.setTiProps(args, $.container);
        $.imageView = $.img.getView();
        $.img.init(args);
        args.zoomable && $.img.setZoomable(true);
        if (args.innerMargin) {
            $.imageView.height = parseInt(args.height) + parseInt(args.innerMargin);
            $.imageView.top = $.imageView._top = -args.innerMargin / 2;
        } else if (args.imageHeight) {
            $.imageView.height = args.imageHeight;
            $.imageView.top = $.container.height - $.imageView.height;
        }
        WTools.cleanArgs(args);
    }
    new (require("alloy/widget"))("ti.ux.image");
    this.__widgetId = "ti.ux.image";
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
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.img = Alloy.createWidget("com.criteriastudio.RemoteImageView", "widget", {
        top: 0,
        defaultImage: "",
        canScale: true,
        enableZoomControls: false,
        height: Ti.UI.SIZE,
        id: "img",
        __parentSymbol: $.__views.container
    });
    $.__views.img.setParent($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    "use strict";
    var args = arguments[0] || {};
    var WTools = require("WidgetTools");
    var REAL_TOP = 0;
    initUI();
    $.updateScroll = function() {};
    exports.set = function(params) {
        $.img.init(params);
        params.zoomable && $.img.setZoomable(true);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;