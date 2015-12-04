function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.criteriastudio.RemoteImageView/" + s : s.substring(0, index) + "/com.criteriastudio.RemoteImageView/" + s.substring(index + 1);
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
    function fadein() {
        animation.fadeIn($.scroll, 300, function() {
            Ti.API.info("fade in window");
        });
    }
    new (require("alloy/widget"))("com.criteriastudio.RemoteImageView");
    this.__widgetId = "com.criteriastudio.RemoteImageView";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "zoomWin";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "transparent",
        navBarHidden: true,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    fadein ? $.addListener($.__views.win, "open", fadein) : __defers["$.__views.win!open!fadein"] = true;
    $.__views.img = Ti.UI.createImageView({
        canScale: true,
        enableZoomControls: true,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        id: "img"
    });
    $.__views.win.add($.__views.img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var animation = require("alloy/animation");
    $.img.image = args.image;
    __defers["$.__views.win!open!fadein"] && $.addListener($.__views.win, "open", fadein);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;