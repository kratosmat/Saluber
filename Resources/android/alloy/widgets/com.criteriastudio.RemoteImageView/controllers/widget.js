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
    function applyImageProperties(props) {
        Scope.applyProperties($.imgContainer, props);
    }
    new (require("alloy/widget"))("com.criteriastudio.RemoteImageView");
    this.__widgetId = "com.criteriastudio.RemoteImageView";
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
    $.__views.imgContainer = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "imgContainer"
    });
    $.__views.imgContainer && $.addTopLevelView($.__views.imgContainer);
    $.__views.img = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        id: "img"
    });
    $.__views.imgContainer.add($.__views.img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Scope = require(WPATH("scope"));
    var args0 = arguments[0] || {};
    exports.init = function(args) {
        var args = args || {};
        args !== args0 && (args = Scope.combine(args, args0));
        var image = args.image;
        if (!image) return;
        delete args.image;
        var codedFilename = Ti.Utils.md5HexDigest(image);
        "high" === Titanium.Platform.displayCaps.density && (codedFilename += "@2x");
        Scope.TI_CACHE_DIR + codedFilename;
        var file = Ti.Filesystem.getFile(Scope.TI_CACHE_DIR, codedFilename);
        if (file.exists()) {
            applyImageProperties(args);
            $.img.image = Scope.resizeWidth({
                blob: file.read(),
                width: Scope.DISPLAY_WIDTH
            });
            $.imgContainer.image = file.getNativePath();
        } else if (Ti.Filesystem.getFile(Scope.TI_RESOURCES_DIR, image).exists()) {
            file = Ti.Filesystem.getFile(Scope.TI_RESOURCES_DIR, image);
            Ti.API.info("image exists in resources dir");
            $.img.image = file.read();
            applyImageProperties(args);
        } else {
            Ti.API.info("File does not exists. DOWNLOAD AND CACHE IMAGE");
            args.justDownloaded = true;
            applyImageProperties(args);
            Scope.downloadImage({
                file: file,
                filename: file.getNativePath(),
                url: image,
                imageView: $.img,
                container: $.imgContainer
            });
        }
        $.img.cacheFilePath = file.getNativePath();
    };
    exports.addEventListener = function(eventName, callback) {
        $.imgContainer.addEventListener(eventName, callback);
    };
    exports.removeEventListener = function(eventName, callback) {
        $.imgContainer.removeEventListener(eventName, callback);
    };
    exports.setZoomable = function() {
        $.img.addEventListener("click", function() {
            if ($.img.image) {
                var win = Alloy.createWidget("com.criteriastudio.RemoteImageView", "zoomWin", {
                    image: $.img.cacheFilePath
                }).getView();
                win.open();
            }
        });
    };
    args0.image && exports.init(args0);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;