function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.rowitem/" + s : s.substring(0, index) + "/ti.ux.rowitem/" + s.substring(index + 1);
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
        $.titleLbl.text = args.title;
        $.subtitleLbl.text = args.subtitle;
        args.count && $.countLbl.applyProperties({
            visible: true,
            text: "  " + args.count + "   "
        });
        args.hasChildren || $.childrenImage.hide();
        $.row.data = args;
    }
    new (require("alloy/widget"))("ti.ux.rowitem");
    this.__widgetId = "ti.ux.rowitem";
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
        size: "15",
        __parentSymbol: $.__views.row
    });
    $.__views.icon.setParent($.__views.row);
    $.__views.titleLbl = Ti.UI.createLabel({
        id: "titleLbl"
    });
    $.__views.row.add($.__views.titleLbl);
    $.__views.subtitleLbl = Ti.UI.createLabel({
        id: "subtitleLbl",
        textAlign: "right"
    });
    $.__views.row.add($.__views.subtitleLbl);
    $.__views.countLbl = Ti.UI.createLabel({
        id: "countLbl",
        backgroundColor: "#bbb",
        color: "#fff",
        textAlign: "center",
        borderRadius: "8",
        height: "20",
        visible: "false"
    });
    $.__views.row.add($.__views.countLbl);
    $.__views.childrenImage = Alloy.createWidget("ti.ux.iconfont", "widget", {
        height: 28,
        width: 15,
        id: "childrenImage",
        __parentSymbol: $.__views.row
    });
    $.__views.childrenImage.setParent($.__views.row);
    $.__views.__alloyId1 = Ti.UI.createView({
        id: "__alloyId1"
    });
    $.__views.row.add($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    initUI();
    $.setValueText = function(valueText) {
        $.subtitleLbl.text = valueText;
    };
    $.getValueText = function() {
        return $.subtitleLbl.text;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;