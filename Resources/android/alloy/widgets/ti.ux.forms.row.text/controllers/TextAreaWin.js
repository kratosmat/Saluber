function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.forms.row.text/" + s : s.substring(0, index) + "/ti.ux.forms.row.text/" + s.substring(index + 1);
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
        $.textarea.value = args.value || "";
        $.textarea.focus();
    }
    function save() {
        $.win.close();
        $.win.fireEvent("save", {
            value: $.textarea.value
        });
    }
    new (require("alloy/widget"))("ti.ux.forms.row.text");
    this.__widgetId = "ti.ux.forms.row.text";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TextAreaWin";
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
        id: "win",
        theme: "Theme.AppCompat.Translucent.NoTitleBar"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    init ? $.addListener($.__views.win, "open", init) : __defers["$.__views.win!open!init"] = true;
    save ? $.addListener($.__views.win, "android:back", save) : __defers["$.__views.win!android:back!save"] = true;
    $.__views.__alloyId3 = Ti.UI.createView({
        id: "__alloyId3"
    });
    $.__views.win.add($.__views.__alloyId3);
    $.__views.textarea = Ti.UI.createTextArea({
        id: "textarea",
        top: "5",
        left: "5",
        right: "5",
        height: "240"
    });
    $.__views.__alloyId3.add($.__views.textarea);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    __defers["$.__views.win!open!init"] && $.addListener($.__views.win, "open", init);
    __defers["$.__views.win!android:back!save"] && $.addListener($.__views.win, "android:back", save);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;